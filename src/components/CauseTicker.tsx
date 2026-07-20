import { useState, useEffect, useRef } from 'react';
import { CAUSE_BREAKDOWN, getCauseDeaths, formatDeathCount, getSecondsSinceYearStart } from '../utils/mortality';
import { CauseStoryCard } from './CauseStoryCard';
import { useShare } from '../hooks/useShare';

const AUTO_SLIDE_MS = 7_000;

export function CauseTicker() {
  const [yearSeconds, setYearSeconds] = useState(() => getSecondsSinceYearStart());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isSharing, shareToStories } = useShare();

  useEffect(() => {
    const id = setInterval(() => setYearSeconds(getSecondsSinceYearStart()), 1000);
    return () => clearInterval(id);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CAUSE_BREAKDOWN.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CAUSE_BREAKDOWN.length) % CAUSE_BREAKDOWN.length);
  };

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, AUTO_SLIDE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isPaused]);

  const active = CAUSE_BREAKDOWN[currentIndex];
  const count = getCauseDeaths(active, yearSeconds);

  return (
    <div
      className="w-full max-w-4xl mx-auto flex flex-col gap-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Hidden Export Card for currently active cause */}
      <CauseStoryCard
        cause={active}
        count={count}
        currentIndex={currentIndex}
        totalCauses={CAUSE_BREAKDOWN.length}
      />

      {/* Large Featured Slide Card */}
      <div
        role="region"
        aria-roledescription="slide"
        aria-label={`${active.label} - Slide ${currentIndex + 1} de ${CAUSE_BREAKDOWN.length}`}
        className="relative overflow-hidden bg-white dark:bg-carbon-950 p-8 sm:p-12 rounded-3xl border border-zinc-200 dark:border-carbon-800 shadow-md transition-all duration-500 flex flex-col justify-between min-h-[26rem]"
      >
        {/* Top Accent Bar (Proportion Scale) */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-zinc-100 dark:bg-carbon-900">
          <div
            className="h-full bg-crimson-600 dark:bg-crimson-500 transition-all duration-700 ease-out"
            style={{ width: `${Math.min(100, active.proportion * 100 * 3.6)}%` }}
          />
        </div>

        {/* Slide Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-carbon-800/80 pb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-zinc-100 dark:bg-carbon-900 rounded-full font-mono text-xs font-bold text-slate-700 dark:text-ash-300">
              Causa {String(currentIndex + 1).padStart(2, '0')} / {String(CAUSE_BREAKDOWN.length).padStart(2, '0')}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-ash-500">
              Desagregação Epidemiológica
            </span>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-mono text-crimson-600 dark:text-crimson-400 font-bold bg-crimson-50 dark:bg-crimson-950/40 px-3 py-1 rounded-full border border-crimson-200 dark:border-crimson-900/60">
              {(active.proportion * 100).toFixed(1).replace('.', ',')}% das mortes masculinas
            </span>
          </div>
        </div>

        {/* Slide Main Content (Large Counter & Title) */}
        <div className="my-8 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-ash-100 capitalize tracking-tight">
              {active.label}
            </h3>

            {/* Share Cause Button */}
            <button
              onClick={() => shareToStories('cause-story-card-export', count)}
              disabled={isSharing}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900 text-xs font-mono text-slate-700 dark:text-ash-300 hover:bg-zinc-100 dark:hover:bg-carbon-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer self-start sm:self-auto disabled:opacity-50"
              title={`Compartilhar estatísticas da causa ${active.label}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              {isSharing ? 'Gerando...' : 'Compartilhar esta causa'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
            <span
              className="font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums leading-none tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 6.5rem)' }}
            >
              {formatDeathCount(count)}
            </span>
            <span className="text-sm font-mono text-slate-500 dark:text-ash-400">
              óbitos masculinos estimados por {active.label.toLowerCase()} desde 01/01/2026
            </span>
          </div>
        </div>

        {/* Slide Footer Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-100 dark:border-carbon-800/80 text-xs font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 dark:text-ash-600 uppercase tracking-wider">Proporção no País</span>
            <span className="text-slate-800 dark:text-ash-200 font-bold text-sm">
              {(active.proportion * 100).toFixed(1).replace('.', ',')}% do total
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-slate-400 dark:text-ash-600 uppercase tracking-wider">Estimativa Anual</span>
            <span className="text-slate-800 dark:text-ash-200 font-bold text-sm">
              ~{active.annualEstimate.toLocaleString('pt-BR')} mortes/ano
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-slate-400 dark:text-ash-600 uppercase tracking-wider">Fonte Oficial</span>
            <span className="text-slate-700 dark:text-ash-300 truncate font-semibold">
              {active.source}
            </span>
          </div>
        </div>
      </div>

      {/* Slide Controls & Carousel Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 shadow-sm">
        {/* Previous / Next Slide Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Slide anterior"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900 text-xs font-mono text-slate-700 dark:text-ash-300 hover:bg-zinc-100 dark:hover:bg-carbon-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-ash-500 cursor-pointer"
          >
            ← Anterior
          </button>
          <button
            onClick={nextSlide}
            aria-label="Próximo slide"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900 text-xs font-mono text-slate-700 dark:text-ash-300 hover:bg-zinc-100 dark:hover:bg-carbon-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-ash-500 cursor-pointer"
          >
            Próximo →
          </button>
        </div>

        {/* Carousel Dots Indicator */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
          {CAUSE_BREAKDOWN.map((c, i) => {
            const isSelected = i === currentIndex;
            return (
              <button
                key={c.id}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Ir para a causa ${c.label}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'w-8 bg-crimson-600 dark:bg-crimson-500'
                    : 'w-2.5 bg-zinc-200 dark:bg-carbon-700 hover:bg-slate-400 dark:hover:bg-ash-600'
                }`}
              />
            );
          })}
        </div>

        <span className="text-xs font-mono text-slate-400 dark:text-ash-600 hidden md:block">
          {isPaused ? 'Pausado (mouse sobre a seção)' : 'Auto-rotação ativa'}
        </span>
      </div>
    </div>
  );
}
