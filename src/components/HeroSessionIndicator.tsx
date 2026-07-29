import { formatSessionTime } from '../utils/time';

interface HeroSessionIndicatorProps {
  sessionSeconds: number;
}

export function HeroSessionIndicator({ sessionSeconds }: HeroSessionIndicatorProps) {
  return (
    <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-ash-400 text-left select-none">
      {sessionSeconds > 0 && (
        <span className="tabular-nums">Sessão: {formatSessionTime(sessionSeconds)}</span>
      )}
    </div>
  );
}
