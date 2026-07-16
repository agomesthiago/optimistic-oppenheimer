import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCounter } from '../hooks/useCounter';
import { useAutoToggle } from '../hooks/useAutoToggle';
import { useShare } from '../hooks/useShare';
import { StoryCard } from './StoryCard';
import {
  formatDeathCount,
  TOTAL_MALE_DEATHS_PER_YEAR,
  DEATHS_PER_SECOND,
  getRateDescription,
  getCounterStartDate,
} from '../utils/mortality';

const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);
const YEAR_LABEL = new Date().getFullYear().toString();
const EPOCH_LABEL = getCounterStartDate().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

function formatSessionTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  if (m > 0) return `${m}m ${String(s).padStart(2, '0')}s`;
  return `${s}s`;
}

export function Hero() {
  const { deaths, sessionDeaths, sessionSeconds, isRunning, start } = useCounter();
  const { isClockMode, toggleMode } = useAutoToggle();
  const { isSharing, shareToStories } = useShare();
  const prevIntegerRef = useRef(0);
  const [didTick, setDidTick] = useState(false);
  const [now, setNow] = useState(() => new Date());
  
  const textContainerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isClockMode) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [isClockMode]);

  // GSAP Animation when mode changes
  useEffect(() => {
    if (textContainerRef.current) {
      gsap.fromTo(
        textContainerRef.current,
        { y: 20, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(1.5)' }
      );
    }
  }, [isClockMode]);

  useEffect(() => {
    const current = Math.floor(deaths);
    if (current !== prevIntegerRef.current) {
      prevIntegerRef.current = current;
      if (!isClockMode) {
        setDidTick(true);
        const id = setTimeout(() => setDidTick(false), 150);
        return () => clearTimeout(id);
      }
    }
  }, [deaths, isClockMode]);

  const sessionCount = Math.floor(sessionDeaths);
  const timeString = now.toLocaleTimeString('pt-BR');

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-dvh px-6 py-16 text-center"
    >
      <StoryCard deaths={deaths} />
      <GradientOverlay active={isRunning} />

      <h1 className="mb-10 max-w-md text-lg md:text-xl font-medium text-slate-600 dark:text-ash-300 leading-snug animate-fade-in">
        <span className="font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums">
          {sessionCount === 0 ? '—' : sessionCount}
        </span>{' '}
        {sessionCount === 1 ? 'homem morreu' : 'homens morreram'} no Brasil desde o seu primeiro acesso.
      </h1>

      <p className="mb-2 text-sm font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-ash-500 transition-opacity">
        {isClockMode ? 'horário local' : `desde ${EPOCH_LABEL}`}
      </p>

      <button
        id="main-counter-toggle"
        onClick={toggleMode}
        aria-live="polite"
        title="Clique para alternar a exibição"
        aria-label={isClockMode ? `Horário atual: ${timeString}` : `${formatDeathCount(deaths)} mortes masculinas desde ${EPOCH_LABEL}`}
        className={`relative z-10 font-mono font-bold leading-none select-none transition-colors duration-500 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50 rounded-3xl hover:opacity-80 ${
          isRunning && !isClockMode ? 'text-slate-900 dark:text-ash-100 dark:counter-glow-active' : 'text-slate-700 dark:text-ash-300'
        }`}
        style={{ fontSize: 'clamp(4rem, 18vw, 12rem)' }}
      >
        <span 
          ref={textContainerRef}
          className={`inline-block ${didTick && !isClockMode ? 'animate-count-up' : ''}`}
        >
          {isClockMode ? timeString : formatDeathCount(deaths)}
        </span>
      </button>

      <p className="mt-4 text-base font-mono text-slate-500 dark:text-ash-500 tabular-nums h-6">
        {sessionSeconds > 0 ? `${formatSessionTime(sessionSeconds)} desde o acesso inicial` : ''}
      </p>

      <p className="mt-2 text-sm font-mono text-slate-500 dark:text-ash-500 transition-all">
        {isClockMode ? (
          <>
            <span className="font-bold text-slate-700 dark:text-ash-300 tabular-nums">{formatDeathCount(deaths)}</span> mortes desde {EPOCH_LABEL}
          </>
        ) : (
          `${getRateDescription()} · todas as causas`
        )}
      </p>

      <div className="mt-16 flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
        <Stat label={`em ${YEAR_LABEL}`} value={formatDeathCount(deaths)} sublabel="estimativa" />
        <div className="hidden sm:block w-px h-12 bg-zinc-300 dark:bg-carbon-700" />
        <Stat label="média anual" value={TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} sublabel="todas as causas" />
        <div className="hidden sm:block w-px h-12 bg-zinc-300 dark:bg-carbon-700" />
        <Stat label="por dia" value={`≈ ${DEATHS_PER_DAY.toLocaleString('pt-BR')}`} sublabel="mortes" />
      </div>

      <button
        onClick={() => shareToStories('story-card-export')}
        disabled={isSharing}
        className={`mt-16 relative z-10 flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-zinc-300 dark:border-carbon-700 bg-white dark:bg-carbon-900 text-sm font-mono tracking-widest uppercase text-slate-700 dark:text-ash-300 hover:bg-zinc-50 dark:hover:bg-carbon-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-ash-500 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        {isSharing ? 'Gerando...' : 'Compartilhar'}
      </button>

      <ScrollHint />
    </section>
  );
}

function GradientOverlay({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 transition-opacity duration-700"
      style={{
        opacity: active ? 0.2 : 0.06,
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(239,68,68,0.18) 0%, transparent 70%)',
      }}
    />
  );
}

function Stat({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-3xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums">{value}</span>
      <span className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-ash-400">{label}</span>
      <span className="text-xs text-slate-400 dark:text-ash-600 font-mono">{sublabel}</span>
    </div>
  );
}

function ScrollHint() {
  return (
    <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
      <span className="text-sm font-mono text-slate-400 dark:text-ash-400">↓</span>
    </div>
  );
}
