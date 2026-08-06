import { SUICIDE_DATA, formatDecimal } from '../utils/mortality';
import type { AspectRatio } from './CauseStoryCard';

interface SuicideStoryCardProps {
  aspectRatio?: AspectRatio;
  id?: string;
  className?: string;
}

export function SuicideStoryCard({ aspectRatio = '9:16', id = 'suicidio-story-card-export', className = '' }: SuicideStoryCardProps) {
  const {
    malePercentage,
  } = SUICIDE_DATA;

  const height = aspectRatio === '3:4' ? 1440 : 1920;
  const headerPt = aspectRatio === '3:4' ? 'pt-12' : 'pt-16';
  const titleMb = aspectRatio === '3:4' ? 'mb-8' : 'mb-12';
  const percentMb = aspectRatio === '3:4' ? 'mb-6' : 'mb-8';
  const textMb = aspectRatio === '3:4' ? 'mb-10' : 'mb-16';

  return (
    <div
      aria-hidden="true"
      id={id}
      className={`flex flex-col items-center justify-between text-center overflow-hidden p-10 md:p-20 select-none ${className}`}
      style={{
        width: '1080px',
        height: `${height}px`,
        backgroundColor: '#0a0a0a',
        color: '#f5f5f5',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background Radial Glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(225, 29, 72, 0.25) 0%, transparent 80%)',
        }}
      />
      
      {/* Brand Header */}
      <div className={`relative z-10 flex flex-col items-center gap-4 ${headerPt}`}>
        <span className="font-mono text-[2.2rem] uppercase tracking-[0.4em] text-zinc-400 font-bold">
          Vidas Masculinas
        </span>
        <div className="h-1 w-24 bg-crimson-600 rounded-full" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center px-16 my-auto w-full">

        {/* Title */}
        <h2 className={`font-bold tracking-tight text-zinc-50 capitalize font-sans max-w-4xl ${titleMb}`} style={{ fontSize: '4.2rem' }}>
          Mortalidade por Suicídio
        </h2>

        {/* Hero Counter */}
        <div 
          className={`font-mono font-bold text-zinc-100 tracking-tight ${percentMb}`}
          style={{
            fontSize: '9rem',
            lineHeight: '1',
            textShadow: '0 0 80px rgba(225, 29, 72, 0.45)'
          }}
        >
          {formatDecimal(malePercentage)}%
        </div>
        
        <p className={`text-[2.6rem] font-mono text-zinc-300 max-w-4xl leading-relaxed ${textMb}`}>
          dos suicídios registrados no Brasil acometem a <strong className="text-zinc-100 font-bold">população masculina</strong>.
        </p>

      </div>

    </div>
  );
}
