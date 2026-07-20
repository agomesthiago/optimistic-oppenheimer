import { useState, useCallback } from 'react';

export type CounterMode = 'deaths' | 'clock' | 'suicide';

/**
 * Hook para gerenciar a alternância entre os três modos do contador principal:
 * 1. 'deaths' — Estimativa em tempo real de óbitos masculinos por todas as causas.
 * 2. 'clock' — Horário local atual.
 * 3. 'suicide' — Estimativa acumulada em tempo real de suicídios masculinos.
 */
export function useAutoToggle() {
  const [mode, setMode] = useState<CounterMode>('deaths');

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      if (prev === 'deaths') return 'clock';
      if (prev === 'clock') return 'suicide';
      return 'deaths';
    });
  }, []);

  const setModeExplicit = useCallback((newMode: CounterMode) => {
    setMode(newMode);
  }, []);

  return {
    mode,
    isClockMode: mode === 'clock',
    isSuicideMode: mode === 'suicide',
    isDeathsMode: mode === 'deaths',
    toggleMode,
    setModeExplicit,
  };
}
