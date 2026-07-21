import { SUICIDE_DATA } from '../utils/mortality';

export function SuicideStoryCard() {
  const {
    male2021,
    malePercentage,
    ratioMaleToFemale
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
        {/* Cause Index Badge */}
        <div className="flex items-center gap-4 mb-8">
          <span className="px-6 py-2 bg-zinc-900 rounded-full font-mono text-[1.8rem] font-bold text-zinc-300 border border-zinc-800">
            Fator de Risco Crítico
          </span>
          <span className="text-[1.8rem] font-mono uppercase tracking-widest text-crimson-400 font-bold bg-crimson-950/60 px-6 py-2 rounded-full border border-crimson-900/60">
            Saúde Mental
          </span>
        </div>

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
          {malePercentage.toString().replace('.', ',')}%
        </div>
        
        <p className="text-[2.6rem] font-mono text-zinc-300 max-w-4xl leading-relaxed mb-16">
          dos suicídios registrados no Brasil acometem a <strong className="text-zinc-100 font-bold">população masculina</strong>.
        </p>

        {/* Cause Metadata Cards */}
        <div className="grid grid-cols-2 gap-8 w-full max-w-4xl pt-10 border-t border-zinc-800/80 text-left font-mono">
          <div className="flex flex-col gap-2 bg-zinc-900/60 p-8 rounded-2xl border border-zinc-800/60">
            <span className="text-[1.6rem] text-zinc-500 uppercase tracking-wider">Razão por Sexo</span>
            <span className="text-[2.4rem] text-zinc-100 font-bold">
              {ratioMaleToFemale.toString().replace('.', ',')} homens / 1 mulher
            </span>
          </div>

          <div className="flex flex-col gap-2 bg-zinc-900/60 p-8 rounded-2xl border border-zinc-800/60">
            <span className="text-[1.6rem] text-zinc-500 uppercase tracking-wider">Homens Vítimas</span>
            <span className="text-[2.4rem] text-zinc-200 font-semibold truncate">
              {male2021.toLocaleString('pt-BR')} (ano-base)
            </span>
          </div>
        </div>
      </div>

      {/* Footer Branding & Link */}
      <div className="relative z-10 pb-20 w-full flex flex-col items-center gap-6">
        <p className="text-[2.2rem] font-mono tracking-widest text-zinc-400 border border-zinc-700/80 bg-zinc-900/50 px-12 py-5 rounded-full">
          vidasmasculinas.vercel.app
        </p>
      </div>
    </div>
  );
}
