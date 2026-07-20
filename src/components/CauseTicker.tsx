import { useState, useEffect, useRef } from 'react';
import { CAUSE_BREAKDOWN, getCauseDeaths, formatDeathCount, getSecondsSinceYearStart } from '../utils/mortality';

const ROTATE_MS = 6_000;

export function CauseTicker() {
  const [yearSeconds, setYearSeconds] = useState(() => getSecondsSinceYearStart());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setInterval(() => setYearSeconds(getSecondsSinceYearStart()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % CAUSE_BREAKDOWN.length);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, isPaused]);

  const activeCause = CAUSE_BREAKDOWN[activeIndex];
  const activeCount = getCauseDeaths(activeCause, yearSeconds);

  return (
    <div
      className="w-full max-w-4xl mx-auto flex flex-col gap-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Featured Active Cause Card */}
      <div
        role="status"
        aria-live="polite"
        className="relative overflow-hidden bg-white dark:bg-carbon-950 p-8 sm:p-10 rounded-2xl border border-zinc-200 dark:border-carbon-800 shadow-sm transition-all duration-500"
      >
        {/* Top bar progress line for active cause proportion */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-100 dark:bg-carbon-900">
          <div
            className="h-full bg-crimson-600 dark:bg-crimson-500 transition-all duration-500"
            style={{ width: `${Math.min(100, activeCause.proportion * 100 * 3.5)}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-ash-500 block mb-2">
              Causa Selecionada · {activeIndex + 1} de {CAUSE_BREAKDOWN.length}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-ash-100 capitalize tracking-tight">
              {activeCause.label}
            </h3>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span
              className="font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums leading-none"
              style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}
            >
              {formatDeathCount(activeCount)}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-ash-400 mt-2">
              óbitos masculinos acumulados em 2026
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200/80 dark:border-carbon-800/80 text-xs font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 dark:text-ash-600 uppercase tracking-wider">Participação Proporcional</span>
            <span className="text-slate-800 dark:text-ash-200 font-bold text-sm">{(activeCause.proportion * 100).toFixed(1).replace('.', ',')}% dos óbitos</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 dark:text-ash-600 uppercase tracking-wider">Estimativa Anual</span>
            <span className="text-slate-800 dark:text-ash-200 font-bold text-sm">~{activeCause.annualEstimate.toLocaleString('pt-BR')} mortes/ano</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 dark:text-ash-600 uppercase tracking-wider">Fonte Oficial</span>
            <span className="text-slate-700 dark:text-ash-300 truncate">{activeCause.source}</span>
          </div>
        </div>
      </div>

      {/* Grid selector of all causes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="tablist" aria-label="Seletor de Causas">
        {CAUSE_BREAKDOWN.map((c, i) => {
          const isSelected = i === activeIndex;
          const causeCount = getCauseDeaths(c, yearSeconds);

          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(i)}
              className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col gap-2 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-ash-500 ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-ash-100 dark:text-carbon-950 border-slate-900 dark:border-ash-100 shadow-md scale-[1.02]'
                  : 'bg-white dark:bg-carbon-950/60 text-slate-700 dark:text-ash-300 border-zinc-200 dark:border-carbon-800 hover:bg-zinc-100 dark:hover:bg-carbon-800/80'
              }`}
            >
              <div className="flex justify-between items-center w-full text-[11px] font-mono uppercase tracking-wider opacity-80">
                <span className="truncate">{c.label}</span>
                <span className="font-bold">{(c.proportion * 100).toFixed(1)}%</span>
              </div>
              <span className="font-mono text-base font-bold tabular-nums">
                {formatDeathCount(causeCount)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
