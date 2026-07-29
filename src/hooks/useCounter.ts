import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  getAccumulatedDeaths,
  getSecondsSinceYearStart,
} from '../utils/mortality';

export interface CounterState {
  /** Mortes acumuladas desde 1º jan do ano corrente até o momento atual */
  deaths: number;
  /** Mortes acumuladas desde o PRIMEIRO ACESSO do usuário (persistente) */
  sessionDeaths: number;
  /** Segundos decorridos desde o primeiro acesso */
  sessionSeconds: number;
  /** Segundos desde o inicio do ano */
  yearSeconds: number;
  /** Contador rodando */
  isRunning: boolean;
}

const TICK_MS = 200; // Reduzido renders/s (issue 2.1)
const STORAGE_KEY = 'contandovidas_first_visit';

/**
 * useCounter
 *
 * deaths = mortes desde 1º jan do ano corrente
 * sessionDeaths = mortes desde o primeiro acesso (salvo no localStorage)
 */
export function useCounter(): CounterState {
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);

  // Recupera o timestamp do primeiro acesso (issue 5.4 - useMemo em vez de useState)
  const firstVisitTime = useMemo<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return parseInt(stored, 10);
      }
      const now = Date.now();
      localStorage.setItem(STORAGE_KEY, now.toString());
      return now;
    } catch {
      // Fallback para abas anônimas se localStorage falhar
      return Date.now();
    }
  }, []);

  const [state, setState] = useState<CounterState>(() => {
    const now = Date.now();
    const sessionElapsed = (now - firstVisitTime) / 1000;
    const totalElapsed = getSecondsSinceYearStart();
    
    return {
      deaths: getAccumulatedDeaths(totalElapsed),
      sessionDeaths: getAccumulatedDeaths(sessionElapsed),
      sessionSeconds: sessionElapsed,
      yearSeconds: totalElapsed,
      isRunning: false,
    };
  });

  const tick = useCallback((timestamp: number) => {
    if (timestamp - lastTickRef.current < TICK_MS) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    lastTickRef.current = timestamp;

    const now = Date.now();
    const sessionElapsed = (now - firstVisitTime) / 1000;
    const totalElapsed = getSecondsSinceYearStart(); // Recalcula sempre para evitar dessincronização (sleep do PC)

    setState({
      deaths: getAccumulatedDeaths(totalElapsed),
      sessionDeaths: getAccumulatedDeaths(sessionElapsed),
      sessionSeconds: sessionElapsed,
      yearSeconds: totalElapsed,
      isRunning: true,
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [firstVisitTime]);

  // Auto-iniciar o contador (issue 5.5)
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return state;
}
