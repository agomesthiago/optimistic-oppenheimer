import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Stats', href: '#estatisticas' },
    { name: 'Longevidade', href: '#expectativa-vida' },
    { name: 'Suicídio', href: '#suicidios' },
    { name: 'Causas', href: '#causas' },
    { name: 'Método', href: '#metodologia' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Smooth scroll to element
    const el = document.querySelector(href);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-100/80 dark:bg-carbon-900/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-carbon-800/50 py-3' : 'bg-transparent py-6'
      }`}
    >
      {/* Scroll Progress Bar (Item 3.2) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] bg-slate-800 dark:bg-ash-300 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] font-bold text-slate-800 dark:text-ash-100 select-none z-50"
        >
          Vidas Masculinas
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[11px] font-mono tracking-widest uppercase text-slate-500 dark:text-ash-400 hover:text-slate-800 dark:hover:text-ash-200 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pl-4 border-l border-zinc-300 dark:border-carbon-700 flex items-center gap-4">
            <ThemeToggle standalone={false} />
            <a 
              href="https://cvv.org.br/chat/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-crimson-600 hover:bg-crimson-700 text-white text-[11px] font-mono tracking-widest uppercase font-bold transition-colors shadow-sm"
            >
              Fale com CVV 188
            </a>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 lg:hidden z-50">
          <ThemeToggle standalone={false} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu principal"
            className="p-2 text-slate-800 dark:text-ash-200 focus:outline-none focus:ring-2 focus:ring-ash-500 rounded-full"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-zinc-100 dark:bg-carbon-900 z-40 flex flex-col items-center justify-center transition-all duration-300 lg:hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-lg font-mono tracking-widest uppercase text-slate-600 dark:text-ash-400 hover:text-slate-900 dark:hover:text-ash-100 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://cvv.org.br/chat/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-3 rounded-full bg-crimson-600 hover:bg-crimson-700 text-white text-sm font-mono tracking-widest uppercase font-bold transition-colors shadow-sm text-center"
            >
              Fale com CVV 188
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
