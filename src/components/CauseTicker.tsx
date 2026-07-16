import { useState, useEffect, useRef } from 'react';
import { CAUSE_BREAKDOWN, getCauseDeaths, formatDeathCount } from '../utils/mortality';

interface CauseTickerProps {
  yearSeconds: number;
}

const ROTATE_MS = 5_500;
const FADE_MS = 350;

export function CauseTicker({ yearSeconds }: CauseTickerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = (nextIndex: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    setTimeout(() => {
      setActiveIndex(nextIndex);
      setVisible(true);
    }, FADE_MS);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      advance((activeIndex + 1) % CAUSE_BREAKDOWN.length);
    }, ROTATE_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeIndex]);

  const cause = CAUSE_BREAKDOWN[activeIndex];
  const count = getCauseDeaths(cause, yearSeconds);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg">
      <div
        role="status"
        aria-live="polite"
        aria-label={`${formatDeathCount(count)} homens ${cause.tickerVerb} neste ano`}
        className="w-full border border-zinc-200 dark:border-carbon-700 bg-white dark:bg-carbon-800 p-8 flex flex-col gap-3 min-h-[9rem] justify-center shadow-sm"
        style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-in-out` }}
      >
        <span className="font-mono text-3xl md:text-4xl font-bold text-slate-800 dark:text-ash-100 tabular-nums">
          {formatDeathCount(count)}
        </span>
        <p className="text-sm md:text-base text-slate-600 dark:text-ash-300 leading-snug">
          homens {cause.tickerVerb} neste ano
        </p>
        <p className="text-xs font-mono text-slate-400 dark:text-ash-600 mt-2">{cause.source}</p>
      </div>

      <div role="tablist" aria-label="Causas de morte" className="flex items-center gap-3">
        {CAUSE_BREAKDOWN.map((c, i) => (
          <button
            key={c.id}
            id={`ticker-${c.id}`}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={c.label}
            onClick={() => i !== activeIndex && advance(i)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:focus:ring-ash-500 dark:focus:ring-offset-carbon-900 ${
              i === activeIndex ? 'w-6 bg-slate-600 dark:bg-ash-400' : 'w-2 bg-zinc-300 dark:bg-carbon-700 hover:bg-slate-400 dark:hover:bg-ash-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
