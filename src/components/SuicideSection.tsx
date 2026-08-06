import { useState } from 'react';
import { SUICIDE_DATA, formatDecimal } from '../utils/mortality';
import { ShareButton } from './ShareButton';
import { SuicideStoryCard } from './SuicideStoryCard';
import { SharePreviewModal } from './SharePreviewModal';

export function SuicideSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    total,
    male,
    female,
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
      data-testid="suicide-section"
      aria-labelledby="suicidio-heading"
      className="relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900/40"
    >
      <span id="suicidio" className="sr-only" />
      <SharePreviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        exportElementId="suicidio-story-card-export"
        renderCard={(props) => (
          <SuicideStoryCard {...props} />
        )}
      />

      <div className="max-w-2xl mx-auto">
        <h2
          id="suicidio-heading"
          className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-6"
        >
          Mortalidade por Suicídio
        </h2>

        <p id="dado-suicidio" className="text-slate-700 dark:text-ash-200 text-lg md:text-xl font-medium leading-relaxed mb-12">
          {typeof year === 'string' && year.startsWith('Média') ? `${year}` : `Em ${year}`}, o Brasil registrou uma média anual de <strong className="text-slate-900 dark:text-ash-100 font-bold">{Math.round(total).toLocaleString('pt-BR')} suicídios</strong>. Quase 4 em cada 5 vítimas foram homens.
        </p>

        {/* Highlight Main Number */}
        <div className="p-8 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 mb-10 shadow-sm flex flex-col md:flex-row items-baseline justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-600 dark:text-ash-400">
              Participação Masculina
            </span>
            <span
              className="font-mono font-bold text-crimson-600 dark:text-crimson-400 tabular-nums leading-none"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 5.5rem)' }}
            >
              {formatDecimal(malePercentage)}%
            </span>
          </div>
          <div className="max-w-xs text-sm text-slate-600 dark:text-ash-300 font-medium leading-relaxed">
            {Math.round(male).toLocaleString('pt-BR')} dos {Math.round(total).toLocaleString('pt-BR')} suicídios anuais registrados no Brasil ocorreram entre a população masculina.
          </div>
        </div>

        {/* Visual Ratio Bar */}
        <div className="p-6 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 space-y-4 mb-10 shadow-sm">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-crimson-600 dark:text-crimson-400 font-bold">
              Homens: {formatDecimal(malePercentage)}% ({Math.round(male).toLocaleString('pt-BR')})
            </span>
            <span className="text-slate-600 dark:text-ash-400">
              Mulheres: {formatDecimal(femalePercentage)}% ({Math.round(female).toLocaleString('pt-BR')})
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
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-ash-400">
              Razão por Sexo
            </span>
            <span className="text-2xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums">
              {formatDecimal(ratioMaleToFemale)} : 1
            </span>
            <span className="text-[11px] font-mono text-slate-600 dark:text-ash-400">
              homens para cada mulher
            </span>
          </div>

          <div className="p-5 bg-white dark:bg-carbon-950 rounded-xl border border-zinc-200 dark:border-carbon-800 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-ash-400">
              Taxa Masculina
            </span>
            <span className="text-2xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums">
              {formatDecimal(maleRatePer100k)} / 100k
            </span>
            <span className="text-[11px] font-mono text-slate-600 dark:text-ash-400">
              por 100 mil homens
            </span>
          </div>

          <div className="p-5 bg-white dark:bg-carbon-950 rounded-xl border border-zinc-200 dark:border-carbon-800 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-ash-400">
              Taxa Feminina
            </span>
            <span className="text-2xl font-mono font-bold text-slate-700 dark:text-ash-300 tabular-nums">
              {formatDecimal(femaleRatePer100k)} / 100k
            </span>
            <span className="text-[11px] font-mono text-slate-600 dark:text-ash-400">
              por 100 mil mulheres
            </span>
          </div>
        </div>

        {/* Prevention Notice */}
        <div className="p-5 bg-zinc-100/70 dark:bg-carbon-800/40 rounded-xl border border-zinc-200/80 dark:border-carbon-700/60 mb-8 flex items-center justify-between gap-4 text-xs font-mono text-slate-600 dark:text-ash-300">
          <span>Se você ou alguém que você conhece precisa de apoio emocional:</span>
          <a
            href="https://cvv.org.br/chat/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3 py-1 bg-white dark:bg-carbon-900 border border-zinc-300 dark:border-carbon-600 rounded font-bold text-slate-900 dark:text-ash-100 hover:border-slate-400 dark:hover:border-ash-400 transition-colors"
          >
            CVV 188 / Chat →
          </a>
        </div>

        {/* Footer note & Share */}
        <div className="pt-4 border-t border-zinc-200/60 dark:border-carbon-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-600 dark:text-ash-400">
            Fonte:{' '}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-slate-700 dark:hover:text-ash-300 transition-colors"
            >
              {source}
            </a>
            . Dados consolidados do Ministério da Saúde / SIM (1996–2024).
          </p>

          <ShareButton
            onClick={() => setIsModalOpen(true)}
            isSharing={false}
            className="shrink-0"
          />
        </div>
      </div>


    </section>
  );
}
