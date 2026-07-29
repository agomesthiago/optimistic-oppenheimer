import { useState, useEffect } from 'react';
import { formatSessionTime } from '../utils/time';
import { formatDeathCount, getAccumulatedSuicides } from '../utils/mortality';

interface HeroSessionIndicatorProps {
  currentSessionSeconds: number;
  currentSessionDeaths: number;
  lifetimeDeaths: number;
  isSuicideMode: boolean;
}

export function HeroSessionIndicator({ 
  currentSessionSeconds, 
  currentSessionDeaths,
  lifetimeDeaths,
  isSuicideMode
}: HeroSessionIndicatorProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  // Ciclo a cada 10 segundos (10000 ms)
  useEffect(() => {
    // Cycles through the 3 states every 10 seconds
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % 3);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const displayedSessionDeaths = isSuicideMode 
    ? getAccumulatedSuicides(currentSessionSeconds) 
    : currentSessionDeaths;
    
  // Para estimar o lifetime em segundos para usar no cálculo de suicídio
  // deaths = seconds * DEATHS_PER_SECOND => seconds = deaths / DEATHS_PER_SECOND
  // Em vez de importar DEATHS_PER_SECOND, usamos uma aproximação baseada na proporção de suicídios (~1.6%)
  const displayedLifetimeDeaths = isSuicideMode
    ? lifetimeDeaths * 0.016
    : lifetimeDeaths;

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col items-start gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-ash-400 text-left select-none transition-all duration-500">
      {currentSessionSeconds > 0 && (
        <span className="tabular-nums transition-opacity duration-500">
          {msgIndex === 0 && `Sessão: ${formatSessionTime(currentSessionSeconds)}`}
          {msgIndex === 1 && (
            <span>
              <span className="text-white font-bold">{formatDeathCount(displayedSessionDeaths)}</span> mortes ocorridas nesta sessão
            </span>
          )}
          {msgIndex === 2 && (
            <span>
              <span className="text-white font-bold">{formatDeathCount(displayedLifetimeDeaths)}</span> mortes desde o seu primeiro acesso
            </span>
          )}
        </span>
      )}
    </div>
  );
}
