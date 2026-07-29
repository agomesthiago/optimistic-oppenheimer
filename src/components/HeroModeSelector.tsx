interface HeroModeSelectorProps {
  isDeathsMode: boolean;
  isSuicideMode: boolean;
  setModeExplicit: (mode: 'deaths' | 'suicide') => void;
}

export function HeroModeSelector({ isDeathsMode, isSuicideMode, setModeExplicit }: HeroModeSelectorProps) {
  return (
    <div className="mb-6 flex items-center justify-center gap-1.5 p-1 rounded-full bg-zinc-200/60 dark:bg-carbon-800/80 border border-zinc-300/60 dark:border-carbon-700 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider select-none">
      <button
        onClick={() => setModeExplicit('deaths')}
        aria-pressed={isDeathsMode}
        className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          isDeathsMode
            ? 'bg-white dark:bg-carbon-950 text-slate-900 dark:text-ash-100 shadow-sm font-bold'
            : 'text-slate-500 dark:text-ash-400 hover:text-slate-800 dark:hover:text-ash-300'
        }`}
      >
        Óbitos Gerais
      </button>
      <button
        onClick={() => setModeExplicit('suicide')}
        aria-pressed={isSuicideMode}
        className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
          isSuicideMode
            ? 'bg-crimson-600 text-white dark:bg-crimson-500 dark:text-white shadow-sm font-bold'
            : 'text-slate-500 dark:text-ash-400 hover:text-slate-800 dark:hover:text-ash-300'
        }`}
      >
        Suicídios
      </button>
    </div>
  );
}
