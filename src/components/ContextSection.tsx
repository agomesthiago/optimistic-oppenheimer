import { MORTALITY_SOURCES, TOTAL_MALE_DEATHS_PER_YEAR, DEATHS_PER_SECOND } from '../utils/mortality';

const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);

const FACTS = [
  { id: 'proportion', number: '~55%', label: 'dos óbitos totais no Brasil', source: 'IBGE RC 2023' },
  { id: 'life-expectancy', number: '−6,6 anos', label: 'expectativa de vida vs. mulheres', source: 'IBGE Tábua 2024' },
  { id: 'external', number: '~85%', label: 'das mortes por causas externas', source: 'SIM/DATASUS 2022' },
  { id: 'young', number: '4,1×', label: 'mais mortes na faixa 20–24 anos vs. mulheres', source: 'IBGE Tábua 2024' },
];

export function ContextSection() {
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
          {MORTALITY_SOURCES.map((s, i) => (
            <span key={s.id}>
              <strong className="text-slate-900 dark:text-ash-100 font-semibold">{s.institution.split(' —')[0]}</strong>
              {i < MORTALITY_SOURCES.length - 1 ? ' e o ' : ''}
            </span>
          ))}
          . O escopo engloba todas as causas de óbito registradas no Brasil, representando uma média histórica de{' '}
          <strong className="text-slate-900 dark:text-ash-100 font-semibold">{TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')}</strong> mortes masculinas anualmente 
          (aproximadamente <strong className="text-slate-900 dark:text-ash-100 font-semibold">{DEATHS_PER_DAY.toLocaleString('pt-BR')}</strong> por dia).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-carbon-700 mb-16 border border-zinc-200 dark:border-carbon-700">
          {FACTS.map((fact) => (
            <div key={fact.id} id={fact.id} className="bg-zinc-50 dark:bg-carbon-900 p-8 flex flex-col gap-3">
              <span
                className="font-mono font-bold text-crimson-600 dark:text-crimson-400 leading-none"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
              >
                {fact.number}
              </span>
              <p className="text-slate-700 dark:text-ash-200 text-base leading-snug font-medium">{fact.label}</p>
              <p className="text-slate-500 dark:text-ash-600 text-xs font-mono mt-auto pt-4">{fact.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
