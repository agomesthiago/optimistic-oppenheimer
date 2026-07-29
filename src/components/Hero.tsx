import { useState, useEffect } from 'react';

import { useAutoToggle } from '../hooks/useAutoToggle';
import { useShare } from '../hooks/useShare';
import { Share2 } from 'lucide-react';
import { StoryCard } from './StoryCard';
import {
  formatDeathCount,
  getAccumulatedSuicides,
  EPOCH_LABEL,
} from '../utils/mortality';
import { HeroScrollIndicator } from './HeroScrollIndicator';
import { HeroSessionIndicator } from './HeroSessionIndicator';
import { HeroModeSelector } from './HeroModeSelector';






interface HeroProps {
  deaths: number;
  sessionDeaths: number;
  sessionSeconds: number;
  yearSeconds: number;
  isRunning: boolean;
}

export function Hero({ deaths, sessionDeaths, sessionSeconds, yearSeconds, isRunning }: HeroProps) {
  const { mode, isSuicideMode, isDeathsMode, toggleMode, setModeExplicit } = useAutoToggle();
  const { isSharing, shareToStories } = useShare();
  const suicideDeaths = getAccumulatedSuicides(yearSeconds);

  // Random persuasive share copy — picks one on mount
  const shareCopy = 'Compartilhe este dado';

  const sessionCount = Math.floor(sessionDeaths);

  const displayHeader = isSuicideMode
    ? 'estimativa em tempo real — suicídios masculinos'
    : 'estimativa em tempo real — todas as causas';

  const displayValue = isSuicideMode
    ? formatDeathCount(suicideDeaths)
    : formatDeathCount(deaths);

  const displayTagline = isSuicideMode
    ? '— suicídios masculinos (77,8% do total)'
    : '— vidas interrompidas';

  // 3.4 aria-live funcional no contador: Região sr-only com cadência estável sem flooding
  const [isHydrated, setIsHydrated] = useState(false);
  const [srAnnouncement, setSrAnnouncement] = useState('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    setSrAnnouncement(`Modo de exibição: ${displayHeader}. Estatística atual: ${displayValue}.`);

    const id = setInterval(() => {
      setSrAnnouncement(`Estatística atualizada: ${displayHeader} - ${displayValue}.`);
    }, 15000);
    return () => clearInterval(id);
  }, [isHydrated, mode, displayHeader, displayValue]);

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-dvh px-6 py-24 text-center overflow-hidden"
    >
      {/* Região sr-only com cadência estável sem flooding para leitores de tela (WCAG 4.1.3 / Padrão Institucional) */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {srAnnouncement}
      </div>

      {isSharing && (
        <StoryCard
          mode={mode}
          deaths={deaths}
          suicideDeaths={suicideDeaths}
        />
      )}

      {/* Center content wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
        <HeroModeSelector 
          isDeathsMode={isDeathsMode} 
          isSuicideMode={isSuicideMode} 
          setModeExplicit={setModeExplicit} 
        />

        <h1 className="mb-8 text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 select-none">
          {displayHeader}
        </h1>

        <button
          id="main-counter-toggle"
          onClick={toggleMode}
          title="Clique para alternar o modo de exibição"
          aria-label={`Alternar modo. Atual: ${displayHeader}`}
          className={`relative font-mono font-bold leading-none select-none transition-colors duration-500 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50 rounded-3xl hover:opacity-90 ${
            isSuicideMode
              ? 'text-crimson-600 dark:text-crimson-400'
              : isRunning
              ? 'text-slate-900 dark:text-ash-100'
              : 'text-slate-700 dark:text-ash-300'
          }`}
          style={{ fontSize: 'clamp(4rem, 15vw, 10.5rem)' }}
        >
          <span 
            className="inline-block tabular-nums min-w-[3.5ch] text-center"
          >
            {displayValue}
          </span>
        </button>

        <p className="mt-6 text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-ash-400 select-none">
          {displayTagline}
        </p>

        <p id="mortalidade-geral" className="mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-ash-300 font-medium">
          {isSuicideMode ? (
            <>
              Até agora, cerca de{' '}
              <span className="font-bold text-crimson-600 dark:text-crimson-400 tabular-nums">
                {formatDeathCount(suicideDeaths)}
              </span>{' '}
              homens cometeram suicídio no Brasil desde {EPOCH_LABEL} (~33 por dia).
            </>
          ) : (
            <>
              <span className="font-bold text-slate-950 dark:text-ash-100 tabular-nums">
                {sessionCount === 0 ? '—' : sessionCount}
              </span>{' '}
              {sessionCount === 1 ? 'homem morreu' : 'homens morreram'} no Brasil desde o seu primeiro acesso.
              <span className="block mt-1 text-xs font-mono text-slate-500 dark:text-ash-400 font-normal">
                (Cálculo local estimado a partir do primeiro acesso neste dispositivo)
              </span>
            </>
          )}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Share button - Ação utilitária de compartilhamento */}
        <button
          onClick={() => shareToStories('story-card-export', isSuicideMode ? suicideDeaths : deaths)}
          disabled={isSharing}
          className="mt-10 mb-8 relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-zinc-300 dark:border-carbon-700 bg-white dark:bg-carbon-900 text-xs font-mono tracking-widest uppercase text-slate-700 dark:text-ash-300 hover:bg-zinc-50 dark:hover:bg-carbon-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-ash-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Share2 size={12} />
          {isSharing ? 'Preparando imagem...' : shareCopy}
        </button>
      </div>

      {/* Bottom Left Corner (Page indicator & Session elapsed timer) */}
      <HeroSessionIndicator sessionSeconds={sessionSeconds} />

      {/* Bottom Right Corner (Scroll indicator line) */}
      <HeroScrollIndicator />
    </section>
  );
}
