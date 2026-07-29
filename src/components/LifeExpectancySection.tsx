import { LIFE_EXPECTANCY_DATA, formatDecimal } from '../utils/mortality';

export function LifeExpectancySection() {
  const { male, female, gap, year, source, sourceUrl } = LIFE_EXPECTANCY_DATA;

  return (
    <section
      id="expectativa-vida"
      aria-labelledby="longevidade-heading"
      className="relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-white dark:bg-transparent"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          id="longevidade-heading"
          className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-6"
        >
          Expectativa de Vida ao Nascer
        </h2>

        <p className="text-slate-700 dark:text-ash-200 text-lg md:text-xl font-medium leading-relaxed mb-12">
          Os homens brasileiros vivem, em média, <strong className="text-crimson-600 dark:text-crimson-400 font-bold">{formatDecimal(gap)} anos a menos</strong> que as mulheres no país.
        </p>

        {/* Big numbers side-by-side comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-zinc-50 dark:bg-carbon-900/50 rounded-2xl border border-zinc-200/80 dark:border-carbon-800 flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-ash-400">
              Homens
            </span>
            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums">
              {formatDecimal(male)}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-ash-400">
              anos de expectativa
            </span>
          </div>

          <div className="p-6 bg-zinc-50 dark:bg-carbon-900/50 rounded-2xl border border-zinc-200/80 dark:border-carbon-800 flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-ash-400">
              Mulheres
            </span>
            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums">
              {formatDecimal(female)}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-ash-400">
              anos de expectativa
            </span>
          </div>

          <div className="group relative overflow-hidden p-6 rounded-2xl bg-zinc-50 dark:bg-carbon-900/50 border border-zinc-200/80 dark:border-carbon-800 hover:border-crimson-500 dark:hover:border-crimson-500/80 shadow-xs hover:shadow-lg hover:shadow-crimson-950/30 transition-all duration-300 flex flex-col gap-2 cursor-default">
            <div className="absolute top-0 left-0 right-0 h-1 bg-crimson-600 dark:bg-crimson-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-ash-400 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 font-semibold transition-colors">
              Diferença
            </span>
            <span className="text-4xl md:text-5xl font-mono font-bold text-slate-900 dark:text-ash-100 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 tabular-nums transition-colors">
              −{formatDecimal(gap)}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-ash-400 font-medium">
              anos de longevidade
            </span>
          </div>
        </div>

        {/* Minimalist Progress/Comparison Bar */}
        <div className="p-6 bg-zinc-50/60 dark:bg-carbon-900/30 rounded-2xl border border-zinc-200/60 dark:border-carbon-800/60 space-y-4 mb-8">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-ash-400">
              <span>Homens ({male.toFixed(1)} anos)</span>
              <span>72,0 / 79,0</span>
            </div>
            <div className="w-full h-2.5 bg-zinc-200 dark:bg-carbon-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-carbon-800 dark:bg-ash-300 rounded-full"
                style={{ width: `${(male / female) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-ash-400">
              <span>Mulheres ({female.toFixed(1)} anos)</span>
              <span>100%</span>
            </div>
            <div className="w-full h-2.5 bg-zinc-200 dark:bg-carbon-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-ash-400 dark:bg-carbon-600 rounded-full"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="pt-4 border-t border-zinc-200/60 dark:border-carbon-800/60">
          <p className="text-xs font-mono text-slate-500 dark:text-ash-400">
            Fonte:{' '}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-700 dark:hover:text-ash-300 transition-colors"
            >
              {source}
            </a>{' '}
            · Dado referente ao ano-base {year}.
          </p>
        </div>
      </div>


    </section>
  );
}
