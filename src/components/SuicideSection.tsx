import { SUICIDE_DATA } from '../utils/mortality';

export function SuicideSection() {
  const {
    total2021,
    male2021,
    female2021,
    malePercentage,
    femalePercentage,
    maleRatePer100k,
    femaleRatePer100k,
    ratioMaleToFemale,
    year,
    source,
    sourceUrl,
  } = SUICIDE_DATA;

  return (
    <section
      id="suicidios"
      aria-labelledby="suicidio-heading"
      className="relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900/40"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          id="suicidio-heading"
          className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-6"
        >
          Mortalidade por Suicídio
        </h2>

        <p className="text-slate-700 dark:text-ash-200 text-lg md:text-xl font-medium leading-relaxed mb-12">
          Em {year}, o Brasil registrou <strong className="text-slate-900 dark:text-ash-100 font-bold">{total2021.toLocaleString('pt-BR')} suicídios</strong>. Quase 4 em cada 5 vítimas foram homens.
        </p>

        {/* Highlight Main Number */}
        <div className="p-8 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 mb-10 shadow-sm flex flex-col md:flex-row items-baseline justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-ash-500">
              Participação Masculina
            </span>
            <span
              className="font-mono font-bold text-crimson-600 dark:text-crimson-400 tabular-nums leading-none"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 5.5rem)' }}
            >
              {malePercentage.toString().replace('.', ',')}%
            </span>
          </div>
          <div className="max-w-xs text-sm text-slate-600 dark:text-ash-300 font-medium leading-relaxed">
            {male2021.toLocaleString('pt-BR')} dos {total2021.toLocaleString('pt-BR')} suicídios registrados no Brasil no ano-base ocorreram entre a população masculina.
          </div>
        </div>

        {/* Visual Ratio Bar */}
        <div className="p-6 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 space-y-4 mb-10 shadow-sm">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-crimson-600 dark:text-crimson-400 font-bold">
              Homens: {malePercentage.toString().replace('.', ',')}% ({male2021.toLocaleString('pt-BR')})
            </span>
            <span className="text-slate-500 dark:text-ash-500">
              Mulheres: {femalePercentage.toString().replace('.', ',')}% ({female2021.toLocaleString('pt-BR')})
            </span>
          </div>
          <div className="w-full h-3 bg-zinc-200 dark:bg-carbon-800 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-crimson-600 dark:bg-crimson-500 transition-all duration-500"
              style={{ width: `${malePercentage}%` }}
              title={`Homens: ${malePercentage}%`}
            />
            <div
              className="h-full bg-slate-300 dark:bg-carbon-600 transition-all duration-500"
              style={{ width: `${femalePercentage}%` }}
              title={`Mulheres: ${femalePercentage}%`}
            />
          </div>
        </div>

        {/* Auxiliary Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 bg-white dark:bg-carbon-950 rounded-xl border border-zinc-200 dark:border-carbon-800 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-ash-500">
              Razão por Sexo
            </span>
            <span className="text-2xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums">
              {ratioMaleToFemale.toString().replace('.', ',')} : 1
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-ash-500">
              homens para cada mulher
            </span>
          </div>

          <div className="p-5 bg-white dark:bg-carbon-950 rounded-xl border border-zinc-200 dark:border-carbon-800 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-ash-500">
              Taxa Masculina
            </span>
            <span className="text-2xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums">
              {maleRatePer100k.toString().replace('.', ',')} / 100k
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-ash-500">
              por 100 mil homens
            </span>
          </div>

          <div className="p-5 bg-white dark:bg-carbon-950 rounded-xl border border-zinc-200 dark:border-carbon-800 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-ash-500">
              Taxa Feminina
            </span>
            <span className="text-2xl font-mono font-bold text-slate-700 dark:text-ash-300 tabular-nums">
              {femaleRatePer100k.toString().replace('.', ',')} / 100k
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-ash-500">
              por 100 mil mulheres
            </span>
          </div>
        </div>

        {/* Prevention Notice */}
        <div className="p-5 bg-zinc-100/70 dark:bg-carbon-800/40 rounded-xl border border-zinc-200/80 dark:border-carbon-700/60 mb-8 flex items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-ash-300">
          <span>Se você ou alguém que você conhece precisa de apoio emocional:</span>
          <span className="shrink-0 px-3 py-1 bg-white dark:bg-carbon-900 border border-zinc-300 dark:border-carbon-600 rounded font-bold text-slate-900 dark:text-ash-100">
            CVV 188
          </span>
        </div>

        {/* Footer note */}
        <div className="pt-4 border-t border-zinc-200/60 dark:border-carbon-800/60">
          <p className="text-xs font-mono text-slate-400 dark:text-ash-600">
            Fonte:{' '}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-700 dark:hover:text-ash-300 transition-colors"
            >
              {source}
            </a>
            . Dados consolidados do Ministério da Saúde / SIM.
          </p>
        </div>
      </div>

      {/* Bottom Left Corner (Page indicator) */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-ash-600 text-left select-none">
        <span className="text-sm font-bold text-slate-600 dark:text-ash-400">.04</span>
      </div>
    </section>
  );
}
