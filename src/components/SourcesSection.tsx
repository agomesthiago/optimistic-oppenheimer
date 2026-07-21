export interface OfficialSource {
  id: string;
  institution: string;
  category: 'IBGE' | 'DATASUS' | 'SIM' | 'Ministério da Saúde' | 'OMS' | 'Fiocruz' | 'INCA' | 'IPEA';
  title: string;
  year: number;
  description: string;
  url: string;
  accessedDate: string;
}

const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: 'source-ibge',
    institution: 'IBGE — Instituto Brasileiro de Geografia e Estatística',
    category: 'IBGE',
    title: 'Tábuas Completas de Mortalidade para o Brasil — Edição 2022',
    year: 2022,
    description: 'Projeções populacionais, expectativa de vida ao nascer por sexo e tábuas atuariais do território brasileiro.',
    url: 'https://www.ibge.gov.br/estatisticas/sociais/populacao/9126-tabuas-completas-de-mortalidade.html',
    accessedDate: '2026-07-20'
  },
  {
    id: 'source-datasus',
    institution: 'DATASUS / SIM — Ministério da Saúde',
    category: 'DATASUS',
    title: 'Sistema de Informações sobre Mortalidade (SIM) — Microdados e Consolidados',
    year: 2021,
    description: 'Registros públicos oficiais de declarações de óbito codificados pela CID-10 para todas as unidades federativas.',
    url: 'https://datasus.saude.gov.br/',
    accessedDate: '2026-07-20'
  },
  {
    id: 'source-ms-suicide',
    institution: 'Ministério da Saúde — Secretaria de Vigilância em Saúde',
    category: 'Ministério da Saúde',
    title: 'Boletim Epidemiológico nº 33 — Mortalidade por Suicídio no Brasil',
    year: 2021,
    description: 'Relatório epidemiológico sobre a prevalência de Lesão Autoprovocada Intencionalmente e distribuição por sexo e faixa etária.',
    url: 'https://www.gov.br/saude/pt-br',
    accessedDate: '2026-07-20'
  },
  {
    id: 'source-inca',
    institution: 'INCA — Instituto Nacional de Câncer',
    category: 'INCA',
    title: 'Estimativa 2023–2025: Incidência de Câncer no Brasil',
    year: 2023,
    description: 'Estatísticas epidemiológicas de incidência e mortalidade por neoplasias malignas em homens (próstata, pulmão, cólon e estômago).',
    url: 'https://www.gov.br/inca/pt-br',
    accessedDate: '2026-07-20'
  },
  {
    id: 'source-ipea',
    institution: 'IPEA / FBSP — Instituto de Pesquisa Econômica Aplicada',
    category: 'IPEA',
    title: 'Atlas da Violência — Séries Históricas de Homicídios no Brasil',
    year: 2023,
    description: 'Análise detalhada de mortalidade violenta intencional, vítimas jovens e perfil de vitimização masculina por armas de fogo.',
    url: 'https://www.ipea.gov.br/atlasviolencia/',
    accessedDate: '2026-07-20'
  },
  {
    id: 'source-oms',
    institution: 'OMS — Organização Mundial da Saúde',
    category: 'OMS',
    title: 'Global Health Estimates (GHE): Male Life Expectancy & Suicide Rates',
    year: 2021,
    description: 'Diretrizes mundiais de prevenção, estimativas globais de saúde e comparação da mortalidade masculina entre países da América Latina.',
    url: 'https://www.who.int/data/gho',
    accessedDate: '2026-07-20'
  },
  {
    id: 'source-fiocruz',
    institution: 'Fiocruz — Fundação Oswaldo Cruz',
    category: 'Fiocruz',
    title: 'Observatório de Saúde Pública: Vulnerabilidades da Saúde Masculina no SUS',
    year: 2022,
    description: 'Estudos sobre barreiras socioculturais de acesso dos homens à Atenção Primária à Saúde e adesão aos exames preventivos.',
    url: 'https://portal.fiocruz.br/',
    accessedDate: '2026-07-20'
  }
];

export function SourcesSection() {
  return (
    <section
      id="fontes"
      aria-labelledby="fontes-heading"
      className="reveal-on-scroll relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-white dark:bg-carbon-950"
    >
      <div className="max-w-4xl mx-auto">
        {/* Definition -> Context -> Data -> Conclusion Structure (FEATURE 09) */}
        <header className="mb-12">
          <h2
            id="fontes-heading"
            className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-4"
          >
            Fontes Oficiais & Rigor Científico (.08)
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-ash-100 tracking-tight mb-4">
            Catálogo completo de instituições federais e organismos internacionais de saúde.
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-ash-300 leading-relaxed max-w-3xl">
            Para garantir transparência, auditabilidade e combate à desinformação, todos os indicadores deste painel são ancorados em publicações abertas oficiais.
          </p>
        </header>

        {/* Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OFFICIAL_SOURCES.map((source) => (
            <article
              key={source.id}
              className="flex flex-col justify-between p-6 bg-zinc-50 dark:bg-carbon-900/60 rounded-2xl border border-zinc-200 dark:border-carbon-800 hover:border-slate-400 dark:hover:border-ash-600 transition-colors"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 bg-zinc-200 dark:bg-carbon-800 rounded-full font-mono text-[10px] uppercase font-bold text-slate-700 dark:text-ash-300">
                    {source.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400 dark:text-ash-500">
                    Ano: {source.year}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-ash-100 leading-snug">
                  {source.institution}
                </h4>

                <p className="text-xs font-mono text-slate-500 dark:text-ash-400 italic">
                  "{source.title}"
                </p>

                <p className="text-xs text-slate-600 dark:text-ash-300 leading-relaxed">
                  {source.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/80 dark:border-carbon-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 dark:text-ash-600 text-[10px]">
                  Acesso: {source.accessedDate}
                </span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crimson-600 dark:text-crimson-400 font-semibold hover:underline flex items-center gap-1"
                >
                  Documento Oficial →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
