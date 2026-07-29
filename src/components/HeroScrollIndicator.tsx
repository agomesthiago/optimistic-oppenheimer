import { ChevronDown } from 'lucide-react';

export function HeroScrollIndicator() {
  return (
    <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 pointer-events-none select-none text-slate-400 dark:text-ash-500">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] [writing-mode:vertical-lr]">
        Scroll
      </span>
      <ChevronDown size={14} className="opacity-50" />
    </div>
  );
}
