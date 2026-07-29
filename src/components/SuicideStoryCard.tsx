import { SUICIDE_DATA, formatDecimal } from '../utils/mortality';

export function SuicideStoryCard() {
  const {
    malePercentage,
  } = SUICIDE_DATA;

  return (
    <div
      aria-hidden="true"
      id="suicidio-story-card-export"
      className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50 flex flex-col items-center justify-between text-center overflow-hidden p-20 select-none"
      style={{
        width: '1080px',
        height: '1920px',
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
      <div className="relative z-10 pt-16 flex flex-col items-center gap-4">
        <span className="font-mono text-[2.2rem] uppercase tracking-[0.4em] text-zinc-400 font-bold">
          Vidas Masculinas
        </span>
        <div className="h-1 w-24 bg-crimson-600 rounded-full" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center px-16 my-auto w-full">

        {/* Title */}
        <h2 className="text-[4.2rem] font-bold tracking-tight text-zinc-50 capitalize mb-12 font-sans max-w-4xl">
          Mortalidade por Suicídio
        </h2>

        {/* Hero Counter */}
        <div 
          className="font-mono font-bold text-zinc-100 mb-8 tracking-tight"
          style={{
            fontSize: '9rem',
            lineHeight: '1',
            textShadow: '0 0 80px rgba(225, 29, 72, 0.45)'
          }}
        >
          {formatDecimal(malePercentage)}%
        </div>
        
        <p className="text-[2.6rem] font-mono text-zinc-300 max-w-4xl leading-relaxed mb-16">
          dos suicídios registrados no Brasil acometem a <strong className="text-zinc-100 font-bold">população masculina</strong>.
        </p>

      </div>

    </div>
  );
}
