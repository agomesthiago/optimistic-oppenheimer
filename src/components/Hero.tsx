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

function HangingBulb({ active, didTick, isClockMode }: { active: boolean; didTick: boolean; isClockMode: boolean }) {
  // Bulb is completely hidden in light mode (no rendering/no animation) and active only in dark mode
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[35dvh] pointer-events-none z-0 hidden dark:block">
      <div className="h-full flex flex-col items-center origin-top animate-pendulum">
        {/* Wire */}
        <div className="w-px h-full bg-zinc-300 dark:bg-carbon-800 transition-colors duration-300" />
        
        {/* Bulb Wrapper */}
        <div className="relative -mt-1 flex flex-col items-center">
          {/* Edison Bulb SVG */}
          <svg 
            width="36" 
            height="64" 
            viewBox="0 0 40 70" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-zinc-400 dark:text-carbon-700 transition-colors duration-300"
          >
            {/* Socket */}
            <path d="M14 2H26V10H14V2Z" fill="currentColor" />
            <path d="M16 10H24V14H16V10Z" fill="currentColor" opacity="0.8" />
            {/* Glass Envelope */}
            <path 
              d="M20 14C11.5 14 8 23.5 11 37.5C12.5 44 16.5 53 16.5 61.5H23.5C23.5 53 27.5 44 29 37.5C32 23.5 28.5 14 20 14Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Filament support */}
            <path d="M17 48L18.5 35" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path d="M23 48L21.5 35" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            {/* Glowing Filament (Edison spiral) - Styled and animated via CSS only in dark mode */}
            <path 
              d="M18.5 35C18.5 32 19.5 30 20 30C20.5 30 21.5 32 21.5 35" 
              strokeWidth="1.8" 
              strokeLinecap="round"
              className="filament-glow transition-colors duration-300"
            />
          </svg>
          
          {/* Radial Light Glow behind the bulb - hidden on light mode, shown in dark mode */}
          <div 
            className="absolute top-10 w-[650px] h-[650px] -translate-y-1/2 rounded-full pointer-events-none hidden dark:block"
            style={{
              background: isClockMode
                ? 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, transparent 80%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)',
              transform: `translateY(-50%) scale(${didTick && !isClockMode ? 1.15 : 1})`,
              filter: 'blur(24px)',
              opacity: active ? 1 : 0.2,
              transition: 'transform 0.15s ease-out, background 0.5s ease-in-out',
              animation: active ? 'flicker-glow 5s infinite alternate' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
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
      className="relative flex flex-col items-center justify-center min-h-dvh px-6 py-24 text-center overflow-hidden"
    >
      <StoryCard deaths={deaths} />
      <HangingBulb active={isRunning} didTick={didTick} isClockMode={isClockMode} />

      {/* Top Left Header (Logo) */}
      <div className="absolute top-8 left-8 z-20 select-none pointer-events-none">
        <span className="font-mono text-xs uppercase tracking-[0.35em] font-bold text-slate-800 dark:text-ash-100">
          Vidas Masculina
        </span>
      </div>

      {/* Top Right Navigation Links */}
      <nav className="absolute top-8 right-24 z-20 hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase text-slate-500 dark:text-ash-500">
        <a href="#recursos" className="hover:text-slate-800 dark:hover:text-ash-200 transition-colors">Ajuda</a>
        <a href="#contexto" className="hover:text-slate-800 dark:hover:text-ash-200 transition-colors">Dados</a>
        <a href="#metodologia" className="hover:text-slate-800 dark:hover:text-ash-200 transition-colors">Método</a>
      </nav>

      {/* Center content wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
        <h1 className="mb-8 text-sm md:text-base font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-500 select-none">
          {isClockMode ? 'horário local' : 'estimativa em tempo real'}
        </h1>

        <button
          id="main-counter-toggle"
          onClick={toggleMode}
          aria-live="polite"
          title="Clique para alternar a exibição"
          aria-label={isClockMode ? `Horário atual: ${timeString}` : `${formatDeathCount(deaths)} mortes masculinas desde ${EPOCH_LABEL}`}
          className={`relative font-mono font-bold leading-none select-none transition-colors duration-500 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50 rounded-3xl hover:opacity-90 ${
            isRunning && !isClockMode ? 'text-slate-900 dark:text-ash-100 dark:counter-glow-active' : 'text-slate-700 dark:text-ash-300'
          }`}
          style={{ fontSize: 'clamp(4rem, 15vw, 10.5rem)' }}
        >
          <span 
            ref={textContainerRef}
            className={`inline-block ${didTick && !isClockMode ? 'animate-count-up' : ''}`}
          >
            {isClockMode ? timeString : formatDeathCount(deaths)}
          </span>
        </button>

        <p className="mt-6 text-sm font-mono uppercase tracking-widest text-slate-500 dark:text-ash-500 select-none">
          {isClockMode ? '— o tempo passa' : '— vidas interrompidas'}
        </p>

        <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-ash-300 font-medium">
          {isClockMode ? (
            <>
              Hoje, <span className="font-bold text-slate-900 dark:text-ash-100 tabular-nums">{formatDeathCount(deaths)}</span> homens morreram no Brasil desde {EPOCH_LABEL}.
            </>
          ) : (
            <>
              <span className="font-bold text-slate-950 dark:text-ash-100 tabular-nums">
                {sessionCount === 0 ? '—' : sessionCount}
              </span>{' '}
              {sessionCount === 1 ? 'homem morreu' : 'homens morreram'} no Brasil desde o seu primeiro acesso.
            </>
          )}
        </p>
      </div>

      {/* Grid of stats */}
      <div className="mt-16 flex flex-col sm:flex-row items-center gap-8 sm:gap-12 relative z-10 select-none">
        <Stat label={`em ${YEAR_LABEL}`} value={formatDeathCount(deaths)} sublabel="estimativa" />
        <div className="hidden sm:block w-px h-12 bg-zinc-300 dark:bg-carbon-700" />
        <Stat label="média anual" value={TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} sublabel="todas as causas" />
        <div className="hidden sm:block w-px h-12 bg-zinc-300 dark:bg-carbon-700" />
        <Stat label="por dia" value={`≈ ${DEATHS_PER_DAY.toLocaleString('pt-BR')}`} sublabel="mortes" />
      </div>

      {/* Share button below stats */}
      <button
        onClick={() => shareToStories('story-card-export')}
        disabled={isSharing}
        className={`mt-14 relative z-10 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-zinc-300 dark:border-carbon-700 bg-white dark:bg-carbon-900 text-xs font-mono tracking-widest uppercase text-slate-700 dark:text-ash-300 hover:bg-zinc-50 dark:hover:bg-carbon-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-ash-500 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        {isSharing ? 'Preparando imagem...' : 'Compartilhar'}
      </button>

      {/* Bottom Left Corner (Page indicator & Session elapsed timer) */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-ash-600 text-left select-none">
        <span className="text-sm font-bold text-slate-600 dark:text-ash-400">.01</span>
        {sessionSeconds > 0 && (
          <span className="tabular-nums">Sessão: {formatSessionTime(sessionSeconds)}</span>
        )}
      </div>

      {/* Bottom Right Corner (Scroll indicator line) */}
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-3.5 pointer-events-none select-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-400 dark:text-ash-600 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <div className="w-px h-12 bg-zinc-200 dark:bg-carbon-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-400 dark:bg-ash-500 animate-scroll-line" />
        </div>
      </div>
    </section>
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

