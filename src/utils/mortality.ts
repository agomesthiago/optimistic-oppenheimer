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

import simData from '../data/sim-mortality-data.json';
import { MORTALITY_CONFIG } from '../config/mortality-config';

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
  /** Categoria epidemiológica opcional (ex: "Causas Externas") */
  category?: string;
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
  total: number;
  male: number;
  female: number;
  malePercentage: number;
  femalePercentage: number;
  maleRatePer100k: number;
  femaleRatePer100k: number;
  ratioMaleToFemale: number;
  year: number | string;
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
export const MORTALITY_SOURCES: MortalitySource[] = (simData && Array.isArray(simData.years))
  ? simData.years.map(y => {
      let notes = `Dados oficiais do SIM (PCDaS) obtidos em ${new Date(simData.source.retrievedAt).toLocaleDateString('pt-BR')}.`;
      if (y.year === 2019) notes = `Mortalidade masculina do SIM (linha de base pré-pandêmica pré-COVID). ${notes}`;
      if (y.year === 2022) notes = `Pico de mortalidade masculina consolidado no SIM. ${notes}`;
      if (y.year === 2023) notes = `Mortalidade masculina consolidada no SIM (Estatísticas do Registro Civil/IBGE). ${notes}`;

      return {
        id: `sim-${y.year}`,
        institution: 'SIM/DATASUS — Ministério da Saúde',
        publication: `Sistema de Informações sobre Mortalidade (Base PCDaS)`,
        year: y.year,
        totalMaleDeaths: y.maleDeaths,
        notes: notes,
        url: 'https://pcdas.icict.fiocruz.br/',
      };
    })
  : [
      {
        id: 'sim-2022',
        institution: 'SIM/DATASUS — Ministério da Saúde',
        publication: 'Sistema de Informações sobre Mortalidade',
        year: 2022,
        totalMaleDeaths: 828_000,
        notes: '~1.520.000 óbitos totais em 2022; 54,5% masculinos. Dado consolidado mais recente.',
        url: 'https://datasus.saude.gov.br/informacoes-de-saude-tabnet/',
      },
      {
        id: 'ibge-rc-2023',
        institution: 'IBGE — Instituto Brasileiro de Geografia e Estatística',
        publication: 'Estatísticas do Registro Civil 2023',
        year: 2023,
        totalMaleDeaths: 785_000,
        notes: '~1.430.000 óbitos em 2023; proporção masculina ~54,9%. Para cada 100 mortes femininas, 121,2 masculinas.',
        url: 'https://www.ibge.gov.br/estatisticas/sociais/populacao/9170-estatisticas-do-registro-civil.html',
      },
      {
        id: 'sim-2019',
        institution: 'SIM/DATASUS — Ministério da Saúde',
        publication: 'Sistema de Informações sobre Mortalidade (linha de base pré-COVID)',
        year: 2019,
        totalMaleDeaths: 729_000,
        notes: '~1.298.000 óbitos em 2019; 56,2% masculinos. Último ano completo antes da pandemia.',
        url: 'https://datasus.saude.gov.br/informacoes-de-saude-tabnet/',
      },
    ];

// ─── Taxa Calculada ───────────────────────────────────────────────────────────

const sumMaleDeaths = MORTALITY_SOURCES.reduce((acc, s) => acc + s.totalMaleDeaths, 0);

/** Média aritmética de óbitos masculinos/ano entre as fontes ativas. */
export const TOTAL_MALE_DEATHS_PER_YEAR = Math.round(sumMaleDeaths / MORTALITY_SOURCES.length);

/**
 * Calcula dinamicamente o número exato de segundos no ano civil atual,
 * ajustando-se automaticamente para anos comuns (365 dias) ou bissextos (366 dias).
 */
function getSecondsInCurrentYear(): number {
  const year = new Date().getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  return (end.getTime() - start.getTime()) / 1000;
}

/** Segundos no ano civil corrente (dinâmico). */
export const SECONDS_PER_YEAR = getSecondsInCurrentYear();

/** Mortes masculinas por segundo — recalculado ao alterar MORTALITY_SOURCES. */
export const DEATHS_PER_SECOND = TOTAL_MALE_DEATHS_PER_YEAR / SECONDS_PER_YEAR;

/** Intervalo médio entre mortes (segundos). */
export const SECONDS_PER_DEATH = 1 / DEATHS_PER_SECOND;

/** Mortes masculinas estimadas por dia. */
export const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);

// Média de suicídios masculinos computada a partir da base do SIM
const sumMaleSuicides = (simData && Array.isArray(simData.years))
  ? simData.years.reduce((acc, y) => acc + (y.causeDeaths?.['suicide'] || y.causeDeaths?.suicide || y.maleSuicides || 0), 0)
  : 0;

/** Total estimado de suicídios masculinos por ano (unificado a partir da média do SIM ou proporção de fallback). */
export const ESTIMATED_SUICIDES_PER_YEAR = (simData && Array.isArray(simData.years) && simData.years.length > 0)
  ? Math.round(sumMaleSuicides / simData.years.length)
  : Math.round(TOTAL_MALE_DEATHS_PER_YEAR * 0.016); // 12.491

// Média de suicídios femininos computada a partir da base do SIM
const sumFemaleSuicides = (simData && Array.isArray(simData.years))
  ? simData.years.reduce((acc, y) => acc + (y.femaleSuicides || 0), 0)
  : 0;

/** Total estimado de suicídios femininos por ano (unificado a partir da média do SIM). */
export const ESTIMATED_FEMALE_SUICIDES_PER_YEAR = (simData && Array.isArray(simData.years) && simData.years.length > 0)
  ? Math.round(sumFemaleSuicides / simData.years.length)
  : Math.round(ESTIMATED_SUICIDES_PER_YEAR * 0.285); // fallback de 22% do total de suicídios

const totalSuicides = ESTIMATED_SUICIDES_PER_YEAR + ESTIMATED_FEMALE_SUICIDES_PER_YEAR;
const maleSuicidePercentage = totalSuicides > 0 ? (ESTIMATED_SUICIDES_PER_YEAR / totalSuicides) * 100 : 77.8;
const femaleSuicidePercentage = 100 - maleSuicidePercentage;
const suicideRatioMaleToFemale = ESTIMATED_FEMALE_SUICIDES_PER_YEAR > 0 ? ESTIMATED_SUICIDES_PER_YEAR / ESTIMATED_FEMALE_SUICIDES_PER_YEAR : 3.5;

// Taxas brutas por 100 mil habitantes baseadas no Censo 2022
const maleSuicideRatePer100k = (ESTIMATED_SUICIDES_PER_YEAR / MORTALITY_CONFIG.POPULATION.MALE) * 100000;
const femaleSuicideRatePer100k = (ESTIMATED_FEMALE_SUICIDES_PER_YEAR / MORTALITY_CONFIG.POPULATION.FEMALE) * 100000;

/** Média diária de suicídios masculinos estimados. */
export const ESTIMATED_SUICIDES_PER_DAY = Math.round(ESTIMATED_SUICIDES_PER_YEAR / 365.25); // 34

/** Taxa de suicídios masculinos por segundo (derivada do valor estimado unificado). */
export const SUICIDE_DEATHS_PER_SECOND = ESTIMATED_SUICIDES_PER_YEAR / SECONDS_PER_YEAR;

export const SUICIDE_DATA: SuicideData = {
  total: totalSuicides,
  male: ESTIMATED_SUICIDES_PER_YEAR,
  female: ESTIMATED_FEMALE_SUICIDES_PER_YEAR,
  malePercentage: maleSuicidePercentage,
  femalePercentage: femaleSuicidePercentage,
  maleRatePer100k: maleSuicideRatePer100k,
  femaleRatePer100k: femaleSuicideRatePer100k,
  ratioMaleToFemale: suicideRatioMaleToFemale,
  year: `Média do Período ${MORTALITY_CONFIG.TARGET_YEARS.join('–')} (excl. 2020–2021)`,
  source: 'Ministério da Saúde / SIM (Base PCDaS / ETL Local)',
  sourceUrl: 'https://pcdas.icict.fiocruz.br/',
};

/** Label de data da âncora temporal (1º jan do ano corrente), formatado pt-BR. */
export const EPOCH_LABEL = getCounterStartDate().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

// ─── Breakdown por Causa ──────────────────────────────────────────────────────

/**
 * Proporções derivadas de SIM/DATASUS 2022, IPEA Atlas da Violência 2024,
 * INCA 2022 e Ministério da Saúde. Embasamento declarado em cada entrada.
 *
 * A soma das proporções < 1 — o restante é "outras causas" não listadas.
 */
export const CAUSE_BREAKDOWN: CauseBreakdown[] = MORTALITY_CONFIG.CAUSES.map(cause => {
  if (cause.id === 'suicide') {
    return {
      id: 'suicide',
      label: cause.label,
      tickerVerb: cause.tickerVerb,
      proportion: ESTIMATED_SUICIDES_PER_YEAR / TOTAL_MALE_DEATHS_PER_YEAR,
      annualEstimate: ESTIMATED_SUICIDES_PER_YEAR,
      source: cause.source,
    };
  }

  return {
    id: cause.id,
    label: cause.label,
    tickerVerb: cause.tickerVerb,
    proportion: cause.proportion,
    annualEstimate: Math.round(TOTAL_MALE_DEATHS_PER_YEAR * cause.proportion),
    source: cause.source,
  };
});

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

/** Número decimal formatado em pt-BR (vírgula como separador). */
export function formatDecimal(value: number, decimals = 1): string {
  return value.toFixed(decimals).replace('.', ',');
}

/** Suicídios masculinos acumulados num dado número de segundos. */
export function getAccumulatedSuicides(seconds: number): number {
  return seconds * SUICIDE_DEATHS_PER_SECOND;
}

/** Descrição legível da taxa. Ex: "1 a cada ~37 segundos" */
export function getRateDescription(): string {
  const s = Math.round(SECONDS_PER_DEATH);
  if (s < 60) return `1 a cada ~${s} segundos`;
  return `1 a cada ~${Math.round(s / 60)} minutos`;
}
