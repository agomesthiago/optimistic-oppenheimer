import { MORTALITY_SOURCES, TOTAL_MALE_DEATHS_PER_YEAR, DEATHS_PER_SECOND } from '../utils/mortality';

const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);

const FACTS = [
  { id: 'proportion', number: '~55%', label: 'dos óbitos totais no Brasil', source: 'IBGE RC 2023' },
  { id: 'life-expectancy', number: '−6,6', label: 'anos de expectativa de vida vs. mulheres', source: 'IBGE Tábua 2024' },
  { id: 'external', number: '~85%', label: 'das mortes por causas externas', source: 'SIM/DATASUS 2022' },
  { id: 'young', number: '4,1×', label: 'mais mortes na faixa 20–24 anos vs. mulheres', source: 'IBGE Tábua 2024' },
];

export function ContextSection() {
  const uniqueInstitutions = Array.from(
    new Set(MORTALITY_SOURCES.map((s) => s.institution.split(' —')[0]))
  );

  return (
    <section
      id="contexto"
      aria-labelledby="contexto-heading"
      className="py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-white dark:bg-transparent"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          id="contexto-heading"
          className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-12 text-center"
        >
          Contexto
        </h2>

        <p className="text-slate-600 dark:text-ash-300 text-base leading-relaxed mb-12 text-center max-w-xl mx-auto">
          Os dados apresentados baseiam-se em estatísticas consolidadas de órgãos oficiais, como o{' '}
          {uniqueInstitutions.map((inst, i) => (
            <span key={inst}>
              <strong className="text-slate-900 dark:text-ash-100 font-semibold">{inst}</strong>
              {i < uniqueInstitutions.length - 1 ? ' e o ' : ''}
            </span>
          ))}
          . O escopo engloba todas as causas de óbito registradas no Brasil, representando uma média histórica de{' '}
          <strong className="text-slate-900 dark:text-ash-100 font-semibold">{TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')}</strong> mortes masculinas anualmente 
          (aproximadamente <strong className="text-slate-900 dark:text-ash-100 font-semibold">{DEATHS_PER_DAY.toLocaleString('pt-BR')}</strong> por dia).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {FACTS.map((fact) => (
            <div
              key={fact.id}
              id={fact.id}
              className="group relative bg-zinc-50/50 dark:bg-carbon-900/40 p-8 flex flex-col gap-3 rounded-2xl border border-zinc-200/60 dark:border-carbon-800 hover:border-zinc-300 dark:hover:border-carbon-700 hover:bg-white dark:hover:bg-carbon-800/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
            >
              <span
                className="font-mono font-bold text-slate-900 dark:text-ash-100 leading-none transition-colors duration-300 group-hover:text-crimson-500 dark:group-hover:text-crimson-400"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
              >
                {fact.number}
              </span>
              <p className="text-slate-700 dark:text-ash-200 text-base leading-snug font-medium transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-ash-100">
                {fact.label}
              </p>
              <p className="text-slate-400 dark:text-ash-600 text-xs font-mono mt-auto pt-4 border-t border-zinc-200/40 dark:border-carbon-800/60">
                {fact.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
