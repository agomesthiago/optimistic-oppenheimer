export function HangingBulb({ active, didTick }: { active: boolean; didTick: boolean }) {
  return (
    <div className="relative h-16 mb-4 pointer-events-none z-0 hidden dark:block">
      <div className="h-full flex flex-col items-center origin-top animate-pendulum">
        <div className="w-px h-full bg-zinc-300 dark:bg-carbon-800 transition-colors duration-300" />
        
        <div className="relative -mt-1 flex flex-col items-center">
          <svg 
            width="36" 
            height="64" 
            viewBox="0 0 40 70" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-zinc-400 dark:text-carbon-700 transition-colors duration-300"
          >
            <path d="M14 2H26V10H14V2Z" fill="currentColor" />
            <path d="M16 10H24V14H16V10Z" fill="currentColor" opacity="0.8" />
            <path 
              d="M20 14C11.5 14 8 23.5 11 37.5C12.5 44 16.5 53 16.5 61.5H23.5C23.5 53 27.5 44 29 37.5C32 23.5 28.5 14 20 14Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path d="M17 48L18.5 35" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path d="M23 48L21.5 35" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path 
              d="M18.5 35C18.5 32 19.5 30 20 30C20.5 30 21.5 32 21.5 35" 
              strokeWidth="1.8" 
              strokeLinecap="round"
              className="filament-glow transition-colors duration-300"
            />
          </svg>
          
          {/* 1. Brilho do Filamento (Soft Socket Glow) */}
          <div 
            className="absolute w-40 h-40 rounded-full pointer-events-none hidden dark:block"
            style={{
              top: '35px',
              left: '50%',
              background: 'radial-gradient(circle, rgba(253,230,138,0.55) 0%, rgba(253,230,138,0.15) 50%, transparent 80%)',
              transform: `translate(-50%, -50%) scale(${didTick ? 1.25 : 1})`,
              filter: 'blur(20px)',
              opacity: active ? 1 : 0.2,
              transition: 'transform 0.15s ease-out',
            }}
            aria-hidden="true"
          />

          {/* 2. Difusão Atmosférica na Superfície do Hero - Emissor Focado na Lâmpada */}
          <div 
            className="absolute w-[1200px] h-[1200px] pointer-events-none hidden dark:block"
            style={{
              top: '20px',
              left: '50%',
              background:
                'radial-gradient(circle at center, rgba(253,230,138,0.09) 0%, rgba(253,230,138,0.05) 30%, rgba(253,230,138,0.02) 60%, rgba(253,230,138,0.005) 85%, transparent 100%)',
              transform: `translate(-50%, -50%) scale(${didTick ? 1.05 : 1})`,
              filter: 'blur(60px)',
              opacity: active ? 1 : 0.25,
              transition: 'transform 0.15s ease-out, background 0.5s ease-in-out',
              animation: active ? 'flicker-glow 5s infinite alternate' : 'none'
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
