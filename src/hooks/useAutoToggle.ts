import { useState, useCallback } from 'react';

export type CounterMode = 'deaths' | 'suicide';

/**
 * Hook para gerenciar a alternância entre os dois modos do contador principal:
 * 1. 'deaths' — Estimativa em tempo real de óbitos masculinos por todas as causas.
 * 2. 'suicide' — Estimativa acumulada em tempo real de suicídios masculinos.
 */
export function useAutoToggle() {
  const [mode, setMode] = useState<CounterMode>('deaths');

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'deaths' ? 'suicide' : 'deaths'));
  }, []);

  const setModeExplicit = useCallback((newMode: CounterMode) => {
    setMode(newMode);
  }, []);

  return {
    mode,
    isSuicideMode: mode === 'suicide',
    isDeathsMode: mode === 'deaths',
    toggleMode,
    setModeExplicit,
  };
}
