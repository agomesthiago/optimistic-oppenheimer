export function HangingBulb({ active, didTick, isClockMode }: { active: boolean; didTick: boolean; isClockMode: boolean }) {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[35dvh] pointer-events-none z-0 hidden dark:block">
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
          
          <div 
            className="absolute top-10 w-[900px] h-[900px] -translate-y-1/2 rounded-full pointer-events-none hidden dark:block"
            style={{
              background: isClockMode
                ? 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 40%, transparent 75%)'
                : 'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 35%, rgba(255,255,255,0.03) 60%, transparent 80%)',
              transform: `translateY(-50%) scale(${didTick && !isClockMode ? 1.12 : 1})`,
              filter: 'blur(30px)',
              opacity: active ? 1 : 0.25,
              transition: 'transform 0.15s ease-out, background 0.5s ease-in-out',
              animation: active ? 'flicker-glow 5s infinite alternate' : 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}
