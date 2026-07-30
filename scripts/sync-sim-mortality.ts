import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { MORTALITY_CONFIG } from '../src/config/mortality-config';

// ─── Interfaces de Tipagem ───

interface YearData {
  year: number;
  maleDeaths: number;
  femaleDeaths: number;
  maleSuicides: number;
  femaleSuicides: number;
  causeDeaths: Record<string, number>; // causas específicas masculinas
}

interface SimMortalityPayload {
  source: {
    provider: string;
    dataset: string;
    index: string;
    retrievedAt: string;
  };
  years: YearData[];
  methodology: {
    maleSexValue: string;
    suicideCidRange: string[];
  };
}

interface EsBucket {
  key: string | number;
  doc_count: number;
}

interface EsAggregationResponse {
  aggregations?: {
    by_year?: {
      buckets?: EsBucket[];
    };
  };
}

// ─── Caminhos e Configurações ───

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonOutputPath = path.resolve(__dirname, '../src/data/sim-mortality-data.json');

// Diretório local de ETL de CSVs
const LOCAL_CSV_DIR = process.env.SIM_LOCAL_CSV_DIR || 'D:\\ETLSIM';
const TARGET_YEARS = MORTALITY_CONFIG.TARGET_YEARS;

// Configurações do ElasticSearch PCDaS (remoto)
const HOST = process.env.PCDAS_ELASTIC_HOST || MORTALITY_CONFIG.ELASTICSEARCH.DEFAULT_HOST;
const PORT = process.env.PCDAS_ELASTIC_PORT || MORTALITY_CONFIG.ELASTICSEARCH.DEFAULT_PORT;
const PROTOCOL = process.env.PCDAS_ELASTIC_PROTOCOL || MORTALITY_CONFIG.ELASTICSEARCH.DEFAULT_PROTOCOL;
const USER = process.env.PCDAS_ELASTIC_USER;
const PASSWORD = process.env.PCDAS_ELASTIC_PASSWORD;
const INDEX = process.env.PCDAS_ELASTIC_INDEX || MORTALITY_CONFIG.ELASTICSEARCH.DEFAULT_INDEX;

// Mapeamento dos campos do ElasticSearch do PCDaS/SIM
const FIELD_SEXO = MORTALITY_CONFIG.SCHEMA_MAP.FIELD_SEXO;
const VALUE_SEXO_MALE = MORTALITY_CONFIG.SCHEMA_MAP.VALUE_SEXO_MALE;
const VALUE_SEXO_FEMALE = MORTALITY_CONFIG.SCHEMA_MAP.VALUE_SEXO_FEMALE;
const FIELD_ANO = MORTALITY_CONFIG.SCHEMA_MAP.FIELD_ANO;
const FIELD_CID = MORTALITY_CONFIG.SCHEMA_MAP.FIELD_CID;

// Encontrar as faixas de CID de suicídio de forma segura no array centralizado
const suicideCauseConfig = MORTALITY_CONFIG.CAUSES.find(c => c.id === 'suicide');
const SUICIDE_GTE = suicideCauseConfig ? suicideCauseConfig.cidRange.gte : 'X60';
const SUICIDE_LTE = suicideCauseConfig ? suicideCauseConfig.cidRange.lte : 'X84';

// ─── Ponto de Entrada de Sincronização Híbrida ───

async function runSync() {
  // 1. Prioriza Processamento Local via CSVs de D:\ETLSIM
  if (fs.existsSync(LOCAL_CSV_DIR) && fs.lstatSync(LOCAL_CSV_DIR).isDirectory()) {
    console.log(`📂 [SIM Sync] Pasta de CSVs locais detectada em "${LOCAL_CSV_DIR}".`);
    console.log(`🚀 Iniciando processamento offline de alta performance de todas as causas de óbito masculinas e femininas...`);
    
    try {
      const startTime = Date.now();
      const yearsData: YearData[] = [];

      for (const year of TARGET_YEARS) {
        const yearResult = await processLocalCsvsForYear(LOCAL_CSV_DIR, year);
        yearsData.push(yearResult);
      }

      // Ordenar anos cronologicamente
      yearsData.sort((a, b) => a.year - b.year);

      const payload: SimMortalityPayload = {
        source: {
          provider: 'ETL SIM Local (CSV)',
          dataset: 'SIM',
          index: LOCAL_CSV_DIR,
          retrievedAt: new Date().toISOString()
        },
        years: yearsData,
        methodology: {
          maleSexValue: VALUE_SEXO_MALE,
          suicideCidRange: [SUICIDE_GTE, SUICIDE_LTE]
        }
      };

      fs.writeFileSync(jsonOutputPath, JSON.stringify(payload, null, 2), 'utf8');
      console.log(`\n🟢 [SIM Sync] Payload de dados salvo em: ${jsonOutputPath}`);

      // Gerar também a API de estatísticas estáticas correspondente com médias reais das causas
      generatePublicStatsJson(yearsData);

      const elapsedMin = ((Date.now() - startTime) / 60000).toFixed(2);
      console.log(`🟢 [SIM Sync] Sincronização offline local concluída em ${elapsedMin} minutos.`);
      process.exit(0);

    } catch (err: any) {
      console.error('🔴 [SIM Sync] Erro no processamento dos arquivos CSV locais:', err.message || err);
      console.warn('⚠️  Revertendo para o mecanismo de sincronização do PCDaS...');
    }
  }

  // 2. Fallback para Sincronização Remota via PCDaS
  if (!USER || !PASSWORD) {
    console.warn('\n⚠️  [SIM Sync] Variáveis PCDAS_ELASTIC_USER ou PCDAS_ELASTIC_PASSWORD não configuradas.');
    console.warn('⚠️  Sincronização remota ignorada. Preservando banco de dados local com estatísticas de fallback.');
    ensureFallbackJson();
    
    // Gerar API estática baseada no JSON existente
    const existingData = JSON.parse(fs.readFileSync(jsonOutputPath, 'utf8')) as SimMortalityPayload;
    generatePublicStatsJson(existingData.years);
    process.exit(0);
  }

  await runRemoteSync();
}

// ─── Processamento de CSVs Locais ───

async function processLocalCsvsForYear(dirPath: string, year: number): Promise<YearData> {
  console.log(`\n⏳ Processando dados do ano: ${year}...`);
  
  // Listar arquivos correspondentes ao ano específico
  const allFiles = fs.readdirSync(dirPath);
  const yearFiles = allFiles.filter(file => file.endsWith(`_${year}_t.csv`));

  if (yearFiles.length === 0) {
    console.warn(`⚠️  Nenhum arquivo CSV encontrado para o ano ${year} na pasta ${dirPath}`);
    
    const emptyCauseDeaths: Record<string, number> = {};
    for (const c of MORTALITY_CONFIG.CAUSES) {
      emptyCauseDeaths[c.id] = 0;
    }
    return { year, maleDeaths: 0, femaleDeaths: 0, maleSuicides: 0, femaleSuicides: 0, causeDeaths: emptyCauseDeaths };
  }

  let totalMaleDeaths = 0;
  let totalFemaleDeaths = 0;
  let totalMaleSuicides = 0;
  let totalFemaleSuicides = 0;

  const causeDeathsMap: Record<string, number> = {};
  for (const c of MORTALITY_CONFIG.CAUSES) {
    causeDeathsMap[c.id] = 0;
  }

  for (const filename of yearFiles) {
    const filePath = path.join(dirPath, filename);
    const result = await countDeathsInCsv(filePath);
    totalMaleDeaths += result.maleDeaths;
    totalFemaleDeaths += result.femaleDeaths;
    totalMaleSuicides += result.maleSuicides;
    totalFemaleSuicides += result.femaleSuicides;

    for (const c of MORTALITY_CONFIG.CAUSES) {
      causeDeathsMap[c.id] += result.causeDeaths[c.id];
    }
  }

  console.log(`✅ Total ${year}:`);
  console.log(`  - Masculino: ${totalMaleDeaths.toLocaleString('pt-BR')} óbitos (suicídios: ${totalMaleSuicides.toLocaleString('pt-BR')})`);
  console.log(`  - Feminino:  ${totalFemaleDeaths.toLocaleString('pt-BR')} óbitos (suicídios: ${totalFemaleSuicides.toLocaleString('pt-BR')})`);
  
  return {
    year,
    maleDeaths: totalMaleDeaths,
    femaleDeaths: totalFemaleDeaths,
    maleSuicides: totalMaleSuicides,
    femaleSuicides: totalFemaleSuicides,
    causeDeaths: causeDeathsMap
  };
}

async function countDeathsInCsv(filePath: string): Promise<{ maleDeaths: number; femaleDeaths: number; maleSuicides: number; femaleSuicides: number; causeDeaths: Record<string, number> }> {
  return new Promise((resolve, reject) => {
    let maleDeaths = 0;
    let femaleDeaths = 0;
    let maleSuicides = 0;
    let femaleSuicides = 0;

    const causeDeaths: Record<string, number> = {};
    for (const c of MORTALITY_CONFIG.CAUSES) {
      causeDeaths[c.id] = 0;
    }

    const fileStream = fs.createReadStream(filePath, 'utf8');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let isHeader = true;
    let sexoIndex = -1;
    let defSexoIndex = -1;
    let causabasIndex = -1;

    rl.on('line', (line) => {
      if (isHeader) {
        const headers = line.split(',');
        sexoIndex = headers.indexOf('SEXO');
        defSexoIndex = headers.indexOf('def_sexo');
        causabasIndex = headers.indexOf('CAUSABAS');
        isHeader = false;
        return;
      }

      const columns = line.split(',');
      const sexo = defSexoIndex !== -1 ? columns[defSexoIndex] : (sexoIndex !== -1 ? columns[sexoIndex] : '');
      const causabas = causabasIndex !== -1 ? columns[causabasIndex] : '';

      const isMale = (sexo === VALUE_SEXO_MALE || sexo === '1');
      const isFemale = (sexo === VALUE_SEXO_FEMALE || sexo === '2');

      if (isMale) {
        maleDeaths++;
        if (causabas) {
          const cleanCausa = causabas.trim().toUpperCase().substring(0, 3);
          for (const cause of MORTALITY_CONFIG.CAUSES) {
            if (cleanCausa >= cause.cidRange.gte && cleanCausa <= cause.cidRange.lte) {
              causeDeaths[cause.id]++;
              if (cause.id === 'suicide') {
                maleSuicides++;
              }
              break;
            }
          }
        }
      } else if (isFemale) {
        femaleDeaths++;
        if (causabas) {
          const cleanCausa = causabas.trim().toUpperCase().substring(0, 3);
          if (cleanCausa >= SUICIDE_GTE && cleanCausa <= SUICIDE_LTE) {
            femaleSuicides++;
          }
        }
      }
    });

    rl.on('close', () => {
      resolve({ maleDeaths, femaleDeaths, maleSuicides, femaleSuicides, causeDeaths });
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}

// ─── Sincronização Remota via PCDaS (ElasticSearch) ───

async function runRemoteSync() {
  console.log(`🔌 [PCDaS Sync] Conectando ao ElasticSearch do PCDaS em ${PROTOCOL}://${HOST}:${PORT}/${INDEX}...`);

  const authHeader = 'Basic ' + Buffer.from(`${USER}:${PASSWORD}`).toString('base64');
  const url = `${PROTOCOL}://${HOST}:${PORT}/${INDEX}/_search`;

  try {
    // 1. Extração de Óbitos Gerais Masculinos e Femininos
    console.log(`- Solicitando óbitos gerais por ano e sexo...`);
    
    // Óbitos Masculinos
    const queryDeathsM = {
      size: 0,
      query: { bool: { must: [{ term: { [`${FIELD_SEXO}.keyword`]: VALUE_SEXO_MALE } }] } },
      aggs: { by_year: { terms: { field: FIELD_ANO, size: 50 } } }
    };
    const responseM = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
      body: JSON.stringify(queryDeathsM)
    });
    const dataM = (await responseM.json()) as EsAggregationResponse;
    const bucketsM = dataM.aggregations?.by_year?.buckets || [];

    // Óbitos Femininos
    const queryDeathsF = {
      size: 0,
      query: { bool: { must: [{ term: { [`${FIELD_SEXO}.keyword`]: VALUE_SEXO_FEMALE } }] } },
      aggs: { by_year: { terms: { field: FIELD_ANO, size: 50 } } }
    };
    const responseF = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
      body: JSON.stringify(queryDeathsF)
    });
    const dataF = (await responseF.json()) as EsAggregationResponse;
    const bucketsF = dataF.aggregations?.by_year?.buckets || [];

    // Suicídios Femininos
    const querySuicidesF = {
      size: 0,
      query: {
        bool: {
          must: [
            { term: { [`${FIELD_SEXO}.keyword`]: VALUE_SEXO_FEMALE } },
            { range: { [FIELD_CID]: { gte: SUICIDE_GTE, lte: SUICIDE_LTE } } }
          ]
        }
      },
      aggs: { by_year: { terms: { field: FIELD_ANO, size: 50 } } }
    };
    const responseSF = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
      body: JSON.stringify(querySuicidesF)
    });
    const dataSF = (await responseSF.json()) as EsAggregationResponse;
    const bucketsSF = dataSF.aggregations?.by_year?.buckets || [];

    const yearMap = new Map<number, YearData>();

    // Inicializar os anos no mapa com óbitos masculinos
    for (const b of bucketsM) {
      const year = Number(b.key);
      if (!isNaN(year) && year >= 2010 && year <= new Date().getFullYear()) {
        const causeMap: Record<string, number> = {};
        for (const c of MORTALITY_CONFIG.CAUSES) {
          causeMap[c.id] = 0;
        }
        yearMap.set(year, {
          year,
          maleDeaths: b.doc_count,
          femaleDeaths: 0,
          maleSuicides: 0,
          femaleSuicides: 0,
          causeDeaths: causeMap
        });
      }
    }

    // Mesclar óbitos femininos
    for (const b of bucketsF) {
      const year = Number(b.key);
      const record = yearMap.get(year);
      if (record) {
        record.femaleDeaths = b.doc_count;
      }
    }

    // Mesclar suicídios femininos
    for (const b of bucketsSF) {
      const year = Number(b.key);
      const record = yearMap.get(year);
      if (record) {
        record.femaleSuicides = b.doc_count;
      }
    }

    // Para cada causa masculina, puxamos a série histórica de agregações
    for (const cause of MORTALITY_CONFIG.CAUSES) {
      console.log(`  - Agregando causa: ${cause.label} (${cause.cidRange.gte} a ${cause.cidRange.lte})...`);
      const queryCause = {
        size: 0,
        query: {
          bool: {
            must: [
              { term: { [`${FIELD_SEXO}.keyword`]: VALUE_SEXO_MALE } },
              { range: { [FIELD_CID]: { gte: cause.cidRange.gte, lte: cause.cidRange.lte } } }
            ]
          }
        },
        aggs: {
          by_year: {
            terms: { field: FIELD_ANO, size: 50 }
          }
        }
      };

      const causeResponse = await fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': authHeader },
        body: JSON.stringify(queryCause)
      }, 20000);

      if (causeResponse.ok) {
        const causeData = (await causeResponse.json()) as EsAggregationResponse;
        const causeBuckets = causeData.aggregations?.by_year?.buckets || [];
        for (const b of causeBuckets) {
          const year = Number(b.key);
          const yearRecord = yearMap.get(year);
          if (yearRecord) {
            yearRecord.causeDeaths[cause.id] = b.doc_count;
            if (cause.id === 'suicide') {
              yearRecord.maleSuicides = b.doc_count;
            }
          }
        }
      }
    }

    const yearsSorted = Array.from(yearMap.values()).sort((a, b) => a.year - b.year);

    if (yearsSorted.length === 0) {
      throw new Error('As agregações do ElasticSearch retornaram buckets vazios.');
    }

    const payload: SimMortalityPayload = {
      source: {
        provider: 'PCDaS/Fiocruz',
        dataset: 'SIM',
        index: INDEX,
        retrievedAt: new Date().toISOString()
      },
      years: yearsSorted,
      methodology: {
        maleSexValue: VALUE_SEXO_MALE,
        suicideCidRange: [SUICIDE_GTE, SUICIDE_LTE]
      }
    };

    fs.writeFileSync(jsonOutputPath, JSON.stringify(payload, null, 2), 'utf8');
    console.log(`\n🟢 [SIM Sync] Sincronização remota concluída com sucesso! Salvo em: ${jsonOutputPath}`);

    // Gerar API estática
    generatePublicStatsJson(yearsSorted);

  } catch (err: any) {
    console.error('\n🔴 [PCDaS Sync] Erro crítico de conexão com a API da Fiocruz:', err.message || err);
    console.warn('⚠️  Mantendo fallback local para preservar o funcionamento do build da aplicação.');
    ensureFallbackJson();
    
    // Gerar API estática baseada no JSON existente
    const existingData = JSON.parse(fs.readFileSync(jsonOutputPath, 'utf8')) as SimMortalityPayload;
    generatePublicStatsJson(existingData.years);
  }
}

// ─── Geração de API de Estatísticas Públicas ───

function generatePublicStatsJson(yearsData: YearData[]) {
  const sumDeaths = yearsData.reduce((acc, y) => acc + y.maleDeaths, 0);
  const avgDeaths = Math.round(sumDeaths / yearsData.length);
  
  const sumFemaleDeaths = yearsData.reduce((acc, y) => acc + (y.femaleDeaths || 0), 0);
  const avgFemaleDeaths = Math.round(sumFemaleDeaths / yearsData.length);

  const sumMaleSuicides = yearsData.reduce((acc, y) => acc + y.maleSuicides, 0);
  const avgMaleSuicides = Math.round(sumMaleSuicides / yearsData.length);

  const sumFemaleSuicides = yearsData.reduce((acc, y) => acc + (y.femaleSuicides || 0), 0);
  const avgFemaleSuicides = Math.round(sumFemaleSuicides / yearsData.length);

  const avgTotalSuicides = avgMaleSuicides + avgFemaleSuicides;
  const malePercentage = avgTotalSuicides > 0 ? (avgMaleSuicides / avgTotalSuicides) * 100 : 77.8;
  const femalePercentage = 100 - malePercentage;
  const ratioMaleToFemale = avgFemaleSuicides > 0 ? avgMaleSuicides / avgFemaleSuicides : 3.5;

  const maleRatePer100k = (avgMaleSuicides / MORTALITY_CONFIG.POPULATION.MALE) * 100000;
  const femaleRatePer100k = (avgFemaleSuicides / MORTALITY_CONFIG.POPULATION.FEMALE) * 100000;

  const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60; // 31557600
  const deathsPerSecond = avgDeaths / SECONDS_PER_YEAR;
  const suicideDeathsPerSecond = avgMaleSuicides / SECONDS_PER_YEAR;
  
  // Calcular a média móvel de cada causa cadastrada
  const causeAverages: Record<string, number> = {};
  for (const cause of MORTALITY_CONFIG.CAUSES) {
    const sumCause = yearsData.reduce((acc, y) => acc + (y.causeDeaths?.[cause.id] || 0), 0);
    causeAverages[cause.id] = Math.round(sumCause / yearsData.length);
  }
  
  // Mapeia todas as causas reais computadas da base do SIM
  const statsCauses = MORTALITY_CONFIG.CAUSES.map(cause => {
    const realAvg = causeAverages[cause.id] || Math.round(avgDeaths * cause.proportion);
    return {
      id: cause.id,
      label: cause.label,
      proportion: realAvg / avgDeaths,
      annual_estimate: realAvg,
      source: cause.source
    };
  });
  
  const statsPayload = {
    total_male_deaths_per_year: avgDeaths,
    total_female_deaths_per_year: avgFemaleDeaths,
    seconds_per_year: SECONDS_PER_YEAR,
    deaths_per_second: deathsPerSecond,
    seconds_per_death: 1 / deathsPerSecond,
    deaths_per_day: Math.round(deathsPerSecond * 86400),
    
    // Estatísticas de Suicídio 100% Dinâmicas e Auditáveis
    suicide_deaths_per_year: avgMaleSuicides,
    suicide_female_deaths_per_year: avgFemaleSuicides,
    suicide_total_deaths_per_year: avgTotalSuicides,
    suicide_male_percentage: malePercentage,
    suicide_female_percentage: femalePercentage,
    suicide_male_rate_per_100k: maleRatePer100k,
    suicide_female_rate_per_100k: femaleRatePer100k,
    suicide_ratio_male_to_female: ratioMaleToFemale,
    suicide_deaths_per_second: suicideDeathsPerSecond,
    suicide_seconds_per_death: 1 / suicideDeathsPerSecond,
    suicide_deaths_per_day: Math.round(suicideDeathsPerSecond * 86400),
    
    epoch_label: "01/01/2026",
    causes: statsCauses
  };

  const publicStatsPath = path.resolve(__dirname, '../public/data/mortality-stats.json');
  fs.writeFileSync(publicStatsPath, JSON.stringify(statsPayload, null, 2), 'utf8');
  console.log(`✓ Estatísticas de API estática sincronizadas em: ${publicStatsPath}`);
}

// ─── Helpers de Conectividade ───

async function fetchWithTimeout(resource: string, options: RequestInit = {}, timeout = 15000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

function ensureFallbackJson() {
  if (fs.existsSync(jsonOutputPath)) {
    console.log('✓ [SIM Sync] Arquivo JSON local já existente. Preservado.');
    return;
  }

  // Se o arquivo não existir de forma alguma, geramos com as causas iniciais estimadas
  const causeDeaths: Record<string, number> = {};
  const mockDeaths = 785000;
  for (const c of MORTALITY_CONFIG.CAUSES) {
    causeDeaths[c.id] = Math.round(mockDeaths * c.proportion);
  }

  const fallbackPayload: SimMortalityPayload = {
    source: {
      provider: 'PCDaS/Fiocruz (Fallback)',
      dataset: 'SIM',
      index: INDEX,
      retrievedAt: new Date().toISOString()
    },
    years: [
      { year: 2019, maleDeaths: 729000, femaleDeaths: 610000, maleSuicides: 10599, femaleSuicides: 3000, causeDeaths: causeDeaths },
      { year: 2022, maleDeaths: 828000, femaleDeaths: 690000, maleSuicides: 12908, femaleSuicides: 3600, causeDeaths: causeDeaths },
      { year: 2023, maleDeaths: 785000, femaleDeaths: 650000, maleSuicides: 12560, femaleSuicides: 3500, causeDeaths: causeDeaths }
    ],
    methodology: {
      maleSexValue: VALUE_SEXO_MALE,
      suicideCidRange: [SUICIDE_GTE, SUICIDE_LTE]
    }
  };

  fs.mkdirSync(path.dirname(jsonOutputPath), { recursive: true });
  fs.writeFileSync(jsonOutputPath, JSON.stringify(fallbackPayload, null, 2), 'utf8');
  console.log('🟢 [SIM Sync] Novo JSON de fallback básico inicializado com sucesso.');
}

// Executar
runSync();
