import { formatDeathCount, formatDecimal } from '../utils/mortality';
import type { CauseBreakdown } from '../utils/mortality';

export type AspectRatio = '9:16' | '3:4';

interface CauseStoryCardProps {
  cause: CauseBreakdown;
  count: number;
  currentIndex: number;
  totalCauses: number;
  aspectRatio?: AspectRatio;
  id?: string;
  className?: string;
}

export function CauseStoryCard({ cause, count, aspectRatio = '9:16', id, className = '' }: CauseStoryCardProps) {
  const percentageStr = formatDecimal(cause.proportion * 100);
  const height = aspectRatio === '3:4' ? 1440 : 1920;
  
  const headerPt = aspectRatio === '3:4' ? 'pt-12' : 'pt-16';
  const paddingXY = 'p-20';
  const badgeMb = aspectRatio === '3:4' ? 'mb-6' : 'mb-8';
  const titleMb = aspectRatio === '3:4' ? 'mb-8' : 'mb-12';
  const counterMb = aspectRatio === '3:4' ? 'mb-8' : 'mb-12';
  const textMb = aspectRatio === '3:4' ? 'mb-10' : 'mb-16';

  return (
    <div
      aria-hidden="true"
      id={id}
      className={`flex flex-col items-center justify-between text-center overflow-hidden select-none ${paddingXY} ${className}`}
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
        {/* Cause Index Badge */}
        <div className={`flex items-center gap-4 ${badgeMb}`}>
          <span className="text-[1.8rem] font-mono uppercase tracking-widest text-crimson-400 font-bold bg-crimson-950/60 px-6 py-2 rounded-full border border-crimson-900/60">
            {percentageStr}% dos óbitos masculinos
          </span>
        </div>

        {/* Cause Title */}
        <h2 className={`text-[4.2rem] font-bold tracking-tight text-zinc-50 capitalize font-sans max-w-4xl ${titleMb}`}>
          {cause.label}
        </h2>

        {/* Hero Counter for this Cause */}
        <div 
          className={`font-mono font-bold text-zinc-100 tracking-tight ${counterMb}`}
          style={{
            fontSize: '11.5rem',
            lineHeight: '1',
            textShadow: '0 0 80px rgba(225, 29, 72, 0.45)'
          }}
        >
          {formatDeathCount(count)}
        </div>
        
        <p className={`text-[2.6rem] font-mono text-zinc-300 max-w-4xl leading-relaxed ${textMb}`}>
          óbitos masculinos contabilizados por <strong className="text-zinc-100 font-bold">{cause.label.toLowerCase()}</strong> no Brasil este ano.
        </p>



      </div>
    </div>
  );
}
