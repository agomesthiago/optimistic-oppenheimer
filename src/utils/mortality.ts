/**
 * mortality.ts — Fonte única de verdade para dados e cálculos de mortalidade
 * masculina no Brasil (todas as causas).
 *
 * COMO ATUALIZAR:
 *   Adicione ou edite entradas em MORTALITY_SOURCES.
 *   A taxa final (DEATHS_PER_SECOND) é recalculada automaticamente como
 *   média aritmética entre todas as fontes ativas.
 *
 * ÂNCORA TEMPORAL:
 *   1º de janeiro do ano corrente — dinâmico, sem hardcode.
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface MortalitySource {
  id: string;
  institution: string;
  publication: string;
  year: number;
  totalMaleDeaths: number;
  notes: string;
  url: string;
}

export interface CauseBreakdown {
  id: string;
  label: string;
  /** Texto para o ticker: "homens {tickerVerb} neste ano" */
  tickerVerb: string;
  /** Proporção do total de mortes masculinas (soma das proporções ≈ 1) */
  proportion: number;
  /** Número absoluto anual estimado, para validação */
  annualEstimate: number;
  source: string;
}

export interface LifeExpectancyData {
  male: number;
  female: number;
  gap: number;
  year: number;
  source: string;
  sourceUrl: string;
}

export interface SuicideData {
  total2021: number;
  male2021: number;
  female2021: number;
  malePercentage: number;
  femalePercentage: number;
  maleRatePer100k: number;
  femaleRatePer100k: number;
  ratioMaleToFemale: number;
  year: number;
  source: string;
  sourceUrl: string;
}

// ─── Dados Nacionais Validados ────────────────────────────────────────────────

export const LIFE_EXPECTANCY_DATA: LifeExpectancyData = {
  male: 72.0,
  female: 79.0,
  gap: 7.0,
  year: 2022,
  source: 'IBGE — Tábuas Completas de Mortalidade (2022)',
  sourceUrl: 'https://www.ibge.gov.br/estatisticas/sociais/populacao/9126-tabuas-completas-de-mortalidade.html',
};

export const SUICIDE_DATA: SuicideData = {
  total2021: 15_507,
  male2021: 12_064,
  female2021: 3_443,
  malePercentage: 77.8,
  femalePercentage: 22.2,
  maleRatePer100k: 11.8,
  femaleRatePer100k: 3.2,
  ratioMaleToFemale: 3.5,
  year: 2021,
  source: 'Ministério da Saúde / SIM / Boletim Epidemiológico (2010–2021)',
  sourceUrl: 'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/boletins/boletins-epidemiologicos',
};

/** Taxa bruta estimada de óbitos masculinos por 100 mil homens no Brasil. */
export const MALE_MORTALITY_RATE_PER_100K = 757;

// ─── Fontes Oficiais ──────────────────────────────────────────────────────────

/**
 * Fontes consolidadas de óbitos masculinos anuais (todas as causas).
 *
 * Exclusões justificadas da média:
 *   SIM 2020 (COVID) e SIM 2021 (pico COVID) — outliers pandêmicos.
 *   Não representam a mortalidade estrutural do país.
 *
 * Fontes incluídas:
 *   SIM 2022 — dado consolidado mais recente (DATASUS/MS)
 *   SIM 2019 — linha de base pré-pandemia
 *   IBGE RC 2023 — Estatísticas do Registro Civil, dado mais recente
 */
export const MORTALITY_SOURCES: MortalitySource[] = [
  {
    id: 'sim-2022',
    institution: 'SIM/DATASUS — Ministério da Saúde',
    publication: 'Sistema de Informações sobre Mortalidade',
    year: 2022,
    // ~1.520.000 óbitos totais; proporção masculina ~54,5% (IBGE RC 2022)
    totalMaleDeaths: 828_000,
    notes: '~1.520.000 óbitos totais em 2022; 54,5% masculinos. Dado consolidado mais recente.',
    url: 'https://datasus.saude.gov.br/informacoes-de-saude-tabnet/',
  },
  {
    id: 'ibge-rc-2023',
    institution: 'IBGE — Instituto Brasileiro de Geografia e Estatística',
    publication: 'Estatísticas do Registro Civil 2023',
    year: 2023,
    // ~1.430.000 óbitos totais; 54,9% masculinos → ~785k
    // "Para cada 100 mortes femininas, 121,2 masculinas" (IBGE RC 2023)
    totalMaleDeaths: 785_000,
    notes:
      '~1.430.000 óbitos em 2023; proporção masculina ~54,9%. Para cada 100 mortes femininas, 121,2 masculinas.',
    url: 'https://www.ibge.gov.br/estatisticas/sociais/populacao/9170-estatisticas-do-registro-civil.html',
  },
  {
    id: 'sim-2019',
    institution: 'SIM/DATASUS — Ministério da Saúde',
    publication: 'Sistema de Informações sobre Mortalidade (linha de base pré-COVID)',
    year: 2019,
    // ~1.298.000 óbitos totais; 56,2% masculinos → ~729k
    totalMaleDeaths: 729_000,
    notes:
      '~1.298.000 óbitos em 2019; 56,2% masculinos. Último ano completo antes da pandemia.',
    url: 'https://datasus.saude.gov.br/informacoes-de-saude-tabnet/',
  },
];

// ─── Taxa Calculada ───────────────────────────────────────────────────────────

const sumMaleDeaths = MORTALITY_SOURCES.reduce((acc, s) => acc + s.totalMaleDeaths, 0);

/** Média aritmética de óbitos masculinos/ano entre as fontes ativas. */
export const TOTAL_MALE_DEATHS_PER_YEAR = Math.round(sumMaleDeaths / MORTALITY_SOURCES.length);

/** Segundos em um ano astronômico (365,25 dias). */
export const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60;

/** Mortes masculinas por segundo — recalculado ao alterar MORTALITY_SOURCES. */
export const DEATHS_PER_SECOND = TOTAL_MALE_DEATHS_PER_YEAR / SECONDS_PER_YEAR;

/** Intervalo médio entre mortes (segundos). */
export const SECONDS_PER_DEATH = 1 / DEATHS_PER_SECOND;

// ─── Breakdown por Causa ──────────────────────────────────────────────────────

/**
 * Proporções derivadas de SIM/DATASUS 2022, IPEA Atlas da Violência 2024,
 * INCA 2022 e Ministério da Saúde. Embasamento declarado em cada entrada.
 *
 * A soma das proporções < 1 — o restante é "outras causas" não listadas.
 */
export const CAUSE_BREAKDOWN: CauseBreakdown[] = [
  {
    id: 'cardiovascular',
    label: 'doenças cardiovasculares',
    tickerVerb: 'morreram de doenças cardiovasculares',
    proportion: 0.254,
    annualEstimate: 210_181,
    source: 'IBGE / SBC — CID-10 I00-I99 (2022)',
  },
  {
    id: 'cancer',
    label: 'câncer',
    tickerVerb: 'morreram de câncer',
    proportion: 0.157,
    annualEstimate: 130_000,
    source: 'INCA / SIM — CID-10 C00-D48 (2022)',
  },
  {
    id: 'respiratory',
    label: 'doenças respiratórias',
    tickerVerb: 'morreram de doenças respiratórias',
    proportion: 0.095,
    annualEstimate: 79_000,
    source: 'SIM/DATASUS — CID-10 J00-J99 (2022)',
  },
  {
    id: 'diabetes',
    label: 'diabetes',
    tickerVerb: 'morreram de diabetes',
    proportion: 0.052,
    annualEstimate: 43_000,
    source: 'SIM/DATASUS — CID-10 E10-E14 (2022)',
  },
  {
    id: 'digestive',
    label: 'doenças digestivas',
    tickerVerb: 'morreram de doenças digestivas',
    proportion: 0.059,
    annualEstimate: 49_000,
    source: 'SIM/DATASUS — CID-10 K00-K93 (2022)',
  },
  {
    id: 'homicide',
    label: 'homicídio',
    tickerVerb: 'foram assassinados',
    proportion: 0.050,
    annualEstimate: 41_744,
    source: 'IPEA — Atlas da Violência 2024 — CID-10 X85-Y09',
  },
  {
    id: 'traffic',
    label: 'acidentes de trânsito',
    tickerVerb: 'morreram em acidentes de trânsito',
    proportion: 0.034,
    annualEstimate: 28_471,
    source: 'SIM/DATASUS + IPEA 2024 — CID-10 V01-V99',
  },
  {
    id: 'suicide',
    label: 'suicídio',
    tickerVerb: 'cometeram suicídio',
    proportion: 0.016,
    annualEstimate: 13_356,
    source: 'Ministério da Saúde / SIM — CID-10 X60-X84 (~2022)',
  },
];

// ─── Âncora Temporal ──────────────────────────────────────────────────────────

/** Retorna 1º jan do ano corrente às 00:00 BRT (UTC-3). */
export function getCounterStartDate(): Date {
  return new Date(`${new Date().getFullYear()}-01-01T00:00:00-03:00`);
}

/** Segundos decorridos desde 1º jan do ano corrente até agora. */
export function getSecondsSinceYearStart(): number {
  return Math.max(0, (Date.now() - getCounterStartDate().getTime()) / 1000);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Mortes estimadas acumuladas num dado número de segundos. */
export function getAccumulatedDeaths(seconds: number): number {
  return seconds * DEATHS_PER_SECOND;
}

/** Mortes estimadas para uma causa num dado número de segundos. */
export function getCauseDeaths(cause: CauseBreakdown, seconds: number): number {
  return Math.floor(seconds * DEATHS_PER_SECOND * cause.proportion);
}

/** Contagem formatada em pt-BR (inteiro). */
export function formatDeathCount(count: number): string {
  return Math.floor(count).toLocaleString('pt-BR');
}

/** Descrição legível da taxa. Ex: "1 a cada ~37 segundos" */
export function getRateDescription(): string {
  const s = Math.round(SECONDS_PER_DEATH);
  if (s < 60) return `1 a cada ~${s} segundos`;
  return `1 a cada ~${Math.round(s / 60)} minutos`;
}
