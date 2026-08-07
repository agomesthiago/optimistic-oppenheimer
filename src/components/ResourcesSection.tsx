import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
const RESOURCES = [
  {
    id: 'cvv',
    name: 'CVV — Centro de Valorização da Vida',
    description: 'Apoio emocional e prevenção do suicídio. Atendimento gratuito, confidencial e disponível 24h por dia por telefone ou chat online.',
    action: 'Acessar Chat 24h',
    href: 'https://cvv.org.br/chat/',
  },
  {
    id: 'caps',
    name: 'CAPS — Centro de Atenção Psicossocial',
    description: 'Rede pública do SUS que oferece acolhimento especializado em saúde mental de forma gratuita e sem necessidade de agendamento.',
    action: 'Buscar CAPS',
    href: 'https://www.google.com/search?q=CAPS+Centros+de+Aten%C3%A7%C3%A3o+Psicossocial+mais+pr%C3%B3ximo',
  }
];


export function ResourcesSection() {
  useScrollReveal();
  
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Only calculate parallax when section is in viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Calculate offset based on scroll position relative to the section
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setOffset((scrollProgress - 0.5) * 150); // Maps to roughly -75px to +75px
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="recursos"
      ref={sectionRef}
      aria-labelledby="recursos-heading"
      className="relative py-32 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-950 overflow-hidden"
    >
      {/* Parallax Background Element */}
      <div 
        className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-2xl max-h-2xl rounded-full bg-gradient-to-br from-crimson-100/50 to-transparent dark:from-crimson-900/10 dark:to-transparent blur-3xl -z-10 opacity-60 pointer-events-none transition-transform duration-75 ease-linear"
        style={{ transform: `translate3d(20%, ${offset}px, 0)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-xl max-h-xl rounded-full bg-gradient-to-tr from-slate-200/50 to-transparent dark:from-carbon-800/30 dark:to-transparent blur-3xl -z-10 opacity-50 pointer-events-none transition-transform duration-75 ease-linear"
        style={{ transform: `translate3d(-20%, ${-offset * 0.8}px, 0)` }}
      />

      <div className="max-w-3xl mx-auto z-10 relative">
        <div className="reveal-on-scroll">
          <h2
            id="recursos-heading"
            className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-6 text-center"
          >
            O que podemos fazer
          </h2>
          <p className="text-slate-600 dark:text-ash-300 text-lg md:text-xl text-center mb-16 leading-relaxed max-w-2xl mx-auto font-light">
            Não é preciso ter as palavras certas.
            Basta <strong className="font-semibold text-slate-800 dark:text-ash-100">estar presente</strong> e perguntar como a pessoa está.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {RESOURCES.map((res, i) => (
            <a
              key={res.id}
              id={res.id}
              href={res.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-on-scroll group flex flex-col justify-between gap-4 p-8 bg-white dark:bg-carbon-900 rounded-2xl border border-zinc-200 dark:border-carbon-700 hover:border-crimson-300 dark:hover:border-crimson-800 transition-all duration-300 hover:shadow-xl hover:shadow-crimson-900/5 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-slate-400"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-col gap-3">
                <span className="text-lg font-bold text-slate-800 dark:text-ash-100 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors">
                  {res.name}
                </span>
                <span className="text-sm text-slate-600 dark:text-ash-400 leading-relaxed">{res.description}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-carbon-800 pt-4">
                <span className="text-xs font-mono tracking-widest uppercase text-slate-600 dark:text-ash-400 group-hover:text-crimson-500 transition-colors">
                  {res.action}
                </span>
                <span className="text-slate-400 group-hover:text-crimson-500 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>
        
      </div>
    </section>
  );
}
