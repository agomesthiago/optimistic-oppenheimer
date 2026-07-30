/**
 * Configurações Centrais e Constantes Metodológicas para Mortalidade Geral e Suicídios.
 * Vidas Masculinas — Engenharia de Dados de Saúde.
 */

// Acesso seguro e compatível a variáveis de ambiente entre browser (Vite) e Node.js
const isNode = typeof globalThis !== 'undefined' && 'process' in globalThis;
const env = isNode ? (globalThis as any).process.env || {} : {};

export const MORTALITY_CONFIG = {
  // ─── Séries Temporais e Metodologia ───

  /**
   * Anos utilizados na base de média móvel para projeção.
   * 
   * NOTA METODOLÓGICA (REGRA DE SEGURANÇA):
   * Omitimos os anos de 2020 e 2021 das médias móveis de linha de base de mortalidade
   * geral por apresentarem anomalias causadas pelo surto pandêmico de COVID-19,
   * o que distorceria a taxa normal projetada por segundo em anos pós-pandêmicos.
   */
  TARGET_YEARS: [2019, 2022, 2023],

  /** Proporção masculina histórica padrão de mortes por suicídio (fallback: 1,6%) */
  FALLBACK_SUICIDE_PROPORTION: 0.016,

  // ─── Dados Populacionais Oficiais do Censo IBGE 2022 ───
  POPULATION: {
    MALE: 98532431,     // População masculina oficial do Censo 2022
    FEMALE: 104530081,  // População feminina oficial do Censo 2022
  },

  // ─── Configurações de Conectividade do PCDaS/Fiocruz (ElasticSearch) ───

  ELASTICSEARCH: {
    DEFAULT_HOST: 'dados-pcdas.icict.fiocruz.br',
    DEFAULT_PORT: '443',
    DEFAULT_PROTOCOL: 'https',
    DEFAULT_INDEX: 'datasus-sim',
  },

  /**
   * Mapeamento de Campos e Variáveis no Índice do ElasticSearch do PCDaS.
   * 
   * HIPÓTESE TÉCNICA (REGRA DE SEGURANÇA):
   * Assume-se que o campo nominal nominalizado no índice PCDaS 'datasus-sim'
   * permanece 'def_sexo' e armazena strings textuais contendo 'Masculino'.
   * Assume-se que o campo que identifica o código CID-10 permanece 'causabas'.
   * Assume-se que a agregação temporal continua se baseando no campo 'ano_obito'.
   * Caso o schema seja reestruturado na Fiocruz, esses campos podem requerer calibração
   * via variáveis de ambiente (PCDAS_FIELD_*).
   */
  SCHEMA_MAP: {
    FIELD_SEXO: env.PCDAS_FIELD_SEXO || 'def_sexo',
    VALUE_SEXO_MALE: env.PCDAS_VALUE_SEXO_MALE || 'Masculino',
    VALUE_SEXO_FEMALE: env.PCDAS_VALUE_SEXO_FEMALE || 'Feminino',
    FIELD_ANO: env.PCDAS_FIELD_ANO || 'ano_obito',
    FIELD_CID: env.PCDAS_FIELD_CID || 'causabas',
  },

  // ─── Metadados Centrais e Definições de Causas de Morte ───

  CAUSES: [
    {
      id: 'cardiovascular',
      label: 'doenças cardiovasculares',
      tickerVerb: 'morreram de doenças cardiovasculares',
      proportion: 0.254,
      cidRange: { gte: 'I00', lte: 'I99' },
      source: 'IBGE / SBC — CID-10 I00-I99 (2022)'
    },
    {
      id: 'cancer',
      label: 'câncer',
      tickerVerb: 'morreram de câncer (neoplasias)',
      proportion: 0.157,
      cidRange: { gte: 'C00', lte: 'D48' },
      source: 'INCA / SIM — CID-10 C00-D48 (2022)'
    },
    {
      id: 'respiratory',
      label: 'doenças respiratórias',
      proportion: 0.095,
      tickerVerb: 'morreram de doenças respiratórias',
      cidRange: { gte: 'J00', lte: 'J99' },
      source: 'SIM/DATASUS — CID-10 J00-J99 (2022)'
    },
    {
      id: 'digestive',
      label: 'doenças digestivas',
      proportion: 0.059,
      tickerVerb: 'morreram de doenças digestivas',
      cidRange: { gte: 'K00', lte: 'K93' },
      source: 'SIM/DATASUS — CID-10 K00-K93 (2022)'
    },
    {
      id: 'diabetes',
      label: 'diabetes',
      proportion: 0.052,
      tickerVerb: 'morreram devido a complicações do diabetes',
      cidRange: { gte: 'E10', lte: 'E14' },
      source: 'SIM/DATASUS — CID-10 E10-E14 (2022)'
    },
    {
      id: 'homicide',
      label: 'homicídio',
      proportion: 0.05,
      tickerVerb: 'foram vítimas de homicídio',
      cidRange: { gte: 'X85', lte: 'Y09' },
      source: 'IPEA — Atlas da Violência 2024 — CID-10 X85-Y09'
    },
    {
      id: 'traffic',
      label: 'acidentes de trânsito',
      proportion: 0.034,
      tickerVerb: 'morreram em acidentes de trânsito',
      cidRange: { gte: 'V01', lte: 'V99' },
      source: 'SIM/DATASUS + IPEA 2024 — CID-10 V01-V99'
    },
    {
      id: 'falls',
      label: 'quedas acidentais',
      proportion: 0.015,
      tickerVerb: 'sofreram quedas acidentais fatais',
      cidRange: { gte: 'W00', lte: 'W19' },
      source: 'SIM/DATASUS — CID-10 W00-W19 (2022)'
    },
    {
      id: 'alcohol_liver',
      label: 'doença hepática alcoólica',
      proportion: 0.011,
      tickerVerb: 'morreram de doença hepática associada ao álcool',
      cidRange: { gte: 'K70', lte: 'K70' },
      source: 'SIM/DATASUS — CID-10 K70 (2022)'
    },
    {
      id: 'drowning',
      label: 'afogamento acidental',
      proportion: 0.007,
      tickerVerb: 'morreram por afogamento ou submersão acidental',
      cidRange: { gte: 'W65', lte: 'W74' },
      source: 'SIM/DATASUS — CID-10 W65-W74 (2022)'
    },
    {
      id: 'suicide',
      label: 'suicídio',
      proportion: 0.016, // Proporção de fallback
      tickerVerb: 'cometeram suicídio',
      cidRange: { gte: 'X60', lte: 'X84' },
      source: 'Ministério da Saúde / SIM — CID-10 X60-X84 (2022)'
    }
  ]
};
export type ConfigCause = typeof MORTALITY_CONFIG.CAUSES[number];
export const SUICIDE_CID_RANGE = MORTALITY_CONFIG.CAUSES.find(c => c.id === 'suicide')!;
