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
import { HeroSessionIndicator } from './HeroSessionIndicator';
import { HeroModeSelector } from './HeroModeSelector';
import { HangingBulb } from './HangingBulb';
import { ShareButton } from './ShareButton';






interface HeroProps {
  deaths: number;
  currentSessionSeconds: number;
  currentSessionDeaths: number;
  lifetimeDeaths: number;
  yearSeconds: number;
  isRunning: boolean;
}

export function Hero({ deaths, currentSessionSeconds, currentSessionDeaths, lifetimeDeaths, yearSeconds, isRunning }: HeroProps) {
  const { mode, isSuicideMode, isDeathsMode, toggleMode, setModeExplicit } = useAutoToggle();
  const { isSharing, shareToStories } = useShare();
  const suicideDeaths = getAccumulatedSuicides(yearSeconds);

  const displayHeader = isSuicideMode
    ? 'estimativa em tempo real — suicídios masculinos'
    : 'estimativa em tempo real — todas as causas';

  const displayValue = isSuicideMode
    ? formatDeathCount(suicideDeaths)
    : formatDeathCount(deaths);

  const displayTagline = isSuicideMode
    ? 'suicídios masculinos (77,8% do total)'
    : 'vidas interrompidas';

  // 3.4 aria-live funcional no contador: Região sr-only com cadência estável sem flooding
  const [isHydrated, setIsHydrated] = useState(false);
  const [srAnnouncement, setSrAnnouncement] = useState('');
  const [didTick, setDidTick] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Animação da lâmpada ao mudar valor
  useEffect(() => {
    setDidTick(true);
    const t = setTimeout(() => setDidTick(false), 150);
    return () => clearTimeout(t);
  }, [deaths]);

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

      <StoryCard
        mode={mode}
        deaths={deaths}
        suicideDeaths={suicideDeaths}
      />

      <HangingBulb active={isRunning} didTick={didTick} />

      {/* Center content wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
        <HeroModeSelector 
          isDeathsMode={isDeathsMode} 
          isSuicideMode={isSuicideMode} 
          setModeExplicit={setModeExplicit} 
        />

        {/* Removed displayHeader H1 per user request */}

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
            className="inline-block tabular-nums min-w-[3.5ch] text-center whitespace-nowrap"
          >
            {displayValue.split('.').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-[0.4em] opacity-80 mx-[0.05em]">.</span>}
              </span>
            ))}
          </span>
        </button>

        <p className="mt-6 text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-ash-400 select-none flex flex-col items-center gap-1">
          <span>{displayTagline}</span>
          {!isSuicideMode && (
            <span className="text-[8px] sm:text-[9px] text-slate-400 dark:text-ash-500 tracking-wider">
              Cálculo local estimado a partir de primeiro de janeiro de 2026
            </span>
          )}
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
          ) : null}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Share button - Ação utilitária de compartilhamento */}
        <ShareButton
          onClick={() => shareToStories('story-card-export', isSuicideMode ? suicideDeaths : deaths)}
          isSharing={isSharing}
          className="mt-10 mb-8"
        />
      </div>

      {/* Bottom Left Corner (Page indicator & Session elapsed timer) */}
      <HeroSessionIndicator 
        currentSessionSeconds={currentSessionSeconds} 
        currentSessionDeaths={currentSessionDeaths}
        lifetimeDeaths={lifetimeDeaths}
        isSuicideMode={isSuicideMode}
      />
    </section>
  );
}
