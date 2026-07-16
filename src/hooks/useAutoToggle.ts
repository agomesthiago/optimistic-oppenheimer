import { useState, useEffect, useCallback } from 'react';

type Mode = 'deaths' | 'clock';

/**
 * Hook para gerenciar a alternância automática entre o modo de óbitos e o modo relógio.
 * 
 * Lógica:
 * - O modo inicial padrão é 'deaths'.
 * - Ao abrir a página (primeiro ciclo), aguarda 15s e alterna para 'clock' por 15s, depois volta para 'deaths'.
 * - A partir daí, aguarda 10 minutos em 'deaths', alterna para 'clock' por 15s, e volta.
 * - Se o usuário clicar manualmente, a lógica inverte: o modo principal passa a ser o novo modo clicado (10 minutos),
 *   e o modo secundário será exibido por 15s.
 */
export function useAutoToggle() {
  const [primaryMode, setPrimaryMode] = useState<Mode>('deaths');
  const [currentMode, setCurrentMode] = useState<Mode>('deaths');
  const [isInitialCycle, setIsInitialCycle] = useState(true);

  const toggleMode = useCallback(() => {
    // Ao clicar, o modo que passa a ser exibido torna-se o novo modo principal
    const newPrimary = currentMode === 'deaths' ? 'clock' : 'deaths';
    setPrimaryMode(newPrimary);
    setCurrentMode(newPrimary);
    setIsInitialCycle(false); // Interação manual cancela o ciclo inicial rápido
  }, [currentMode]);

  useEffect(() => {
    let timeoutId: number;

    if (currentMode === primaryMode) {
      // Estamos no modo principal. Quanto tempo até a próxima alternância breve?
      const delay = isInitialCycle ? 15_000 : 10 * 60 * 1000; // 15s ou 10 minutos
      
      timeoutId = window.setTimeout(() => {
        setIsInitialCycle(false);
        setCurrentMode(primaryMode === 'deaths' ? 'clock' : 'deaths');
      }, delay);
    } else {
      // Estamos no modo secundário/breve. Fica por 15 segundos e volta ao principal.
      timeoutId = window.setTimeout(() => {
        setCurrentMode(primaryMode);
      }, 15_000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentMode, primaryMode, isInitialCycle]);

  return {
    isClockMode: currentMode === 'clock',
    toggleMode,
  };
}
