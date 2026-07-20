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
      className="w-full max-w-2xl mx-auto flex flex-col gap-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Featured Active Cause Display */}
      <div
        role="status"
        aria-live="polite"
        className="relative overflow-hidden bg-white dark:bg-carbon-950 p-8 rounded-2xl border border-zinc-200/80 dark:border-carbon-800 shadow-sm transition-all duration-500"
      >
        {/* Top bar progress line for active cause */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-100 dark:bg-carbon-900">
          <div
            className="h-full bg-crimson-600 dark:bg-crimson-500 transition-all duration-300"
            style={{ width: `${(activeCause.proportion * 100 * 3.5)}%` }}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-ash-500 block mb-1">
              Causa Selecionada ({activeIndex + 1}/{CAUSE_BREAKDOWN.length})
            </span>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-ash-100 capitalize">
              {activeCause.label}
            </h3>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="font-mono text-3xl md:text-4xl font-bold text-slate-900 dark:text-ash-100 tabular-nums">
              {formatDeathCount(activeCount)}
            </span>
            <span className="text-xs font-mono text-slate-400 dark:text-ash-500">
              óbitos masculinos em 2026
            </span>
          </div>
        </div>

        <div className="p-4 bg-zinc-50 dark:bg-carbon-900/50 rounded-xl border border-zinc-200/60 dark:border-carbon-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <span className="text-slate-600 dark:text-ash-300">
            Proporção no total de mortes: <strong className="text-slate-900 dark:text-ash-100">{(activeCause.proportion * 100).toFixed(1).replace('.', ',')}%</strong> (~{activeCause.annualEstimate.toLocaleString('pt-BR')}/ano)
          </span>
          <span className="text-slate-400 dark:text-ash-500 shrink-0">
            Fonte: {activeCause.source}
          </span>
        </div>
      </div>

      {/* Cause Selector Pills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="tablist" aria-label="Seletor de Causas">
        {CAUSE_BREAKDOWN.map((c, i) => {
          const isSelected = i === activeIndex;
          const causeCount = getCauseDeaths(c, yearSeconds);

          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(i)}
              className={`p-3 rounded-xl text-left border transition-all duration-200 flex flex-col gap-1 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-ash-500 ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-ash-100 dark:text-carbon-950 border-slate-900 dark:border-ash-100 shadow-sm scale-[1.02]'
                  : 'bg-white dark:bg-carbon-900/40 text-slate-700 dark:text-ash-300 border-zinc-200/80 dark:border-carbon-800 hover:bg-zinc-100 dark:hover:bg-carbon-800'
              }`}
            >
              <div className="flex justify-between items-center w-full text-[10px] font-mono uppercase tracking-wider opacity-70">
                <span className="truncate">{c.label}</span>
                <span>{(c.proportion * 100).toFixed(1)}%</span>
              </div>
              <span className="font-mono text-sm font-bold tabular-nums">
                {formatDeathCount(causeCount)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
