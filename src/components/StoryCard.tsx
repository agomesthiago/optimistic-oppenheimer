import { formatDeathCount, getCounterStartDate } from '../utils/mortality';
import type { CounterMode } from '../hooks/useAutoToggle';

interface StoryCardProps {
  mode: CounterMode;
  deaths: number;
  suicideDeaths: number;
  timeString: string;
}

const EPOCH_LABEL = getCounterStartDate().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function StoryCard({ mode, deaths, suicideDeaths, timeString }: StoryCardProps) {
  const isClock = mode === 'clock';
  const isSuicide = mode === 'suicide';

  const titleText = isClock
    ? 'O Tempo Não Para'
    : isSuicide
    ? 'Prevenção ao Suicídio Masculino'
    : 'Mortalidade Masculina no Brasil';

  const taglineText = isClock
    ? 'Horário Local'
    : isSuicide
    ? '77,8% das Vítimas são Homens (MS / SIM)'
    : `Estimativa Acumulada Desde ${EPOCH_LABEL}`;

  const mainValue = isClock
    ? timeString
    : isSuicide
    ? formatDeathCount(suicideDeaths)
    : formatDeathCount(deaths);

  const subtitleText = isClock
    ? 'A cada segundo, a emergência da mortalidade masculina continua no país.'
    : isSuicide
    ? 'homens cometeram suicídio no Brasil desde 01/01/2026 (~33 mortes por dia). Se precisar de ajuda, ligue CVV 188.'
    : 'homens morreram no Brasil por causas evitáveis, acidentes e violência este ano.';

  const accentColor = isSuicide
    ? 'rgba(225, 29, 72, 0.35)'
    : 'rgba(239, 68, 68, 0.25)';

  return (
    <div
      aria-hidden="true"
      id="story-card-export"
      className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50 flex flex-col items-center justify-between text-center overflow-hidden p-20 select-none"
      style={{
        width: '1080px',
        height: '1920px',
        backgroundColor: '#0a0a0a',
        color: '#f5f5f5',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${accentColor} 0%, transparent 80%)`,
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
      <div className="relative z-10 flex flex-col items-center justify-center px-16 my-auto">
        <h2 className="text-[3.8rem] font-bold tracking-tight text-zinc-100 leading-snug mb-12 font-sans">
          {titleText}
        </h2>
        
        <p className="mb-12 text-[2.2rem] font-mono uppercase tracking-[0.25em] text-zinc-400 font-semibold bg-zinc-900/80 px-8 py-3 rounded-full border border-zinc-800">
          {taglineText}
        </p>

        <div 
          className={`font-mono font-bold tracking-tight mb-14 ${isSuicide ? 'text-crimson-400' : 'text-zinc-50'}`}
          style={{
            fontSize: isClock ? '12rem' : '13rem',
            lineHeight: '1',
            textShadow: isSuicide ? '0 0 90px rgba(225,29,72,0.6)' : '0 0 90px rgba(255,255,255,0.3)'
          }}
        >
          {mainValue}
        </div>
        
        <p className="text-[2.8rem] font-mono text-zinc-300 max-w-4xl leading-relaxed">
          {subtitleText}
        </p>
      </div>

      {/* Footer Branding & Link */}
      <div className="relative z-10 pb-20 w-full flex flex-col items-center gap-6">
        {isSuicide && (
          <p className="text-[2.2rem] font-mono text-crimson-400 font-bold tracking-widest uppercase">
            Apoio Emocional Gratuito · Ligue CVV 188
          </p>
        )}
        <p className="text-[2.2rem] font-mono tracking-widest text-zinc-400 border border-zinc-700/80 bg-zinc-900/50 px-12 py-5 rounded-full">
          vidasmasculinas.vercel.app
        </p>
      </div>
    </div>
  );
}
