import { formatDeathCount, getCounterStartDate } from '../utils/mortality';

interface StoryCardProps {
  deaths: number;
}

const EPOCH_LABEL = getCounterStartDate().toLocaleDateString('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function StoryCard({ deaths }: StoryCardProps) {
  return (
    <div
      aria-hidden="true"
      id="story-card-export"
      className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        width: '1080px',
        height: '1920px',
        backgroundColor: '#0a0a0a',
        color: '#f5f5f5',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Background Gradient similar to Hero */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(239,68,68,0.2) 0%, transparent 80%)',
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center px-24">
        <h2 className="text-[3.5rem] font-medium text-zinc-400 leading-snug mb-20 font-sans">
          Enquanto você lia isso,<br />
          mais vidas foram ceifadas.
        </h2>
        
        <p className="mb-8 text-[2.5rem] font-mono uppercase tracking-[0.2em] text-zinc-500">
          Desde {EPOCH_LABEL}
        </p>

        <div 
          className="font-mono font-bold text-zinc-100 mb-20"
          style={{ fontSize: '15rem', lineHeight: '1', textShadow: '0 0 80px rgba(239,68,68,0.4)' }}
        >
          {formatDeathCount(deaths)}
        </div>
        
        <p className="text-[3rem] font-mono text-zinc-400 max-w-4xl leading-relaxed">
          homens morreram no Brasil por causas evitáveis, acidentes e violência.
        </p>
      </div>

      <div className="absolute bottom-32 w-full flex justify-center opacity-50">
        <p className="text-[2.2rem] font-mono tracking-widest text-zinc-400 border border-zinc-700 px-10 py-5 rounded-md">
          vidasmasculina.com.br
        </p>
      </div>
    </div>
  );
}
