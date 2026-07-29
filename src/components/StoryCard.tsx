import { formatDeathCount } from '../utils/mortality';
import type { CounterMode } from '../hooks/useAutoToggle';

interface StoryCardProps {
  mode: CounterMode;
  deaths: number;
  suicideDeaths: number;
}

export function StoryCard({ mode, deaths, suicideDeaths }: StoryCardProps) {
  const isSuicide = mode === 'suicide';

  const mainValue = isSuicide
    ? formatDeathCount(suicideDeaths)
    : formatDeathCount(deaths);

  const subtitleText = isSuicide
    ? 'suicídios masculinos'
    : 'vidas interrompidas';

  // Site-matching dramatic glow
  const accentGlow = isSuicide
    ? 'radial-gradient(circle at 50% 45%, rgba(225, 29, 72, 0.4) 0%, rgba(225, 29, 72, 0.1) 35%, transparent 65%)'
    : 'radial-gradient(circle at 50% 45%, rgba(253, 230, 138, 0.15) 0%, rgba(253, 230, 138, 0.05) 40%, transparent 70%)';

  const textGlow = isSuicide
    ? '0 0 120px rgba(225,29,72,0.8), 0 0 40px rgba(255,255,255,0.4)'
    : '0 0 120px rgba(253,230,138,0.4), 0 0 40px rgba(255,255,255,0.3)';

  return (
    <div
      aria-hidden="true"
      id="story-card-export"
      className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50 flex flex-col items-center text-center overflow-hidden p-20 select-none"
      style={{
        width: '1080px',
        height: '1920px',
        backgroundColor: '#09090b', // zinc-950
        color: '#f8fafc',
        fontFamily: "'Inter', system-ui, sans-serif"
      }}
    >
      {/* Dynamic Background Glow matching Hero */}
      <div 
        className="absolute inset-0"
        style={{ background: accentGlow }}
      />
      
      {/* Noise Texture Overlay for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center w-full flex-grow px-16" style={{ paddingBottom: '100px' }}>
        <div 
          className="font-mono font-bold tracking-tighter whitespace-nowrap text-white"
          style={{
            fontSize: '13rem',
            lineHeight: '1',
            textShadow: textGlow
          }}
        >
          {mainValue.split('.').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <span className="text-[0.4em] opacity-80 mx-[0.05em]">.</span>}
            </span>
          ))}
        </div>

        <p className="font-mono uppercase tracking-[0.2em] mt-8 text-zinc-400" style={{ fontSize: '2.4rem' }}>
          {subtitleText}
        </p>
      </div>
      
      {/* Footer matching Hero branding - Moved up above bottom safe zone */}
      <div className="absolute z-10 w-full flex flex-col items-center gap-6" style={{ bottom: '280px' }}>
        <div className="w-16 h-px bg-zinc-700/50" />
        <p className="font-mono text-zinc-500 font-bold tracking-[0.4em] uppercase" style={{ fontSize: '2rem' }}>
          VIDAS MASCULINAS
        </p>
        <p className="font-mono text-zinc-400 opacity-80 tracking-widest uppercase mt-4" style={{ fontSize: '1.4rem', maxWidth: '60%', lineHeight: '1.6' }}>
          Uma estatística silenciosa. <span className={isSuicide ? 'text-crimson-400 font-bold' : 'text-amber-200 font-bold'}>Quebre o silêncio</span> e compartilhe para ajudar a conscientizar.
        </p>
      </div>
    </div>
  );
}
