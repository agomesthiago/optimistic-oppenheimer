import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export function GlobalScrollIndicator() {
  const [scrollY, setScrollY] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate if we're near the bottom of the page (e.g. within 100px)
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
      setIsAtBottom(scrollPosition >= documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll down by one viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  // Efeito paralaxe suave no Y baseado no scroll (move sutilmente pra cima/baixo)
  // Como o position é fixed, a gente oscila ele com um Math.sin baseado no scroll para criar a "dança"
  // ou simplesmente um pequeno deslocamento
  const parallaxOffset = Math.sin(scrollY * 0.01) * 10;

  return (
    <button 
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 cursor-pointer text-slate-400 dark:text-ash-500 hover:text-slate-700 dark:hover:text-ash-200 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-slate-400 rounded-full p-2"
      style={{
        transform: `translateY(${parallaxOffset}px)`,
        transition: 'transform 0.1s ease-out'
      }}
      aria-label={isAtBottom ? "Voltar ao topo" : "Rolar para baixo"}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] [writing-mode:vertical-lr] transition-all duration-300">
        {isAtBottom ? 'Topo' : 'Deslize'}
      </span>
      <div className="transition-transform duration-500" style={{ transform: isAtBottom ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        <ChevronDown size={14} className="opacity-50" />
      </div>
    </button>
  );
}
