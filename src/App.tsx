import { useEffect } from 'react';
import { useCounter } from './hooks/useCounter';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { CauseTicker } from './components/CauseTicker';
import { ContextSection } from './components/ContextSection';
import { MethodologySection } from './components/MethodologySection';
import { ResourcesSection } from './components/ResourcesSection';
import { DataFooter } from './components/DataFooter';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const { deaths, sessionDeaths, sessionSeconds, isRunning, start } = useCounter();

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content" className="relative min-h-dvh">
      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02] dark:opacity-[0.04] z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />

      <ThemeToggle />

      <div className="relative z-10">
        <Hero 
          deaths={deaths} 
          sessionDeaths={sessionDeaths} 
          sessionSeconds={sessionSeconds} 
          isRunning={isRunning} 
        />
        
        <div className="reveal-on-scroll">
          <StatsSection deaths={deaths} />
        </div>

        <div className="reveal-on-scroll">
          <ResourcesSection />
        </div>
        
        {/* Dedicated Causes Section */}
        <section className="reveal-on-scroll py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-100 dark:bg-carbon-900/50">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-12 select-none">
              <span className="text-sm font-mono font-bold text-slate-400 dark:text-ash-600">.04</span>
              <div className="h-px w-8 bg-zinc-200 dark:bg-carbon-800" />
              <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400">
                Detalhes por causa
              </h2>
            </div>
            <div className="w-full flex justify-center">
              <CauseTicker />
            </div>
          </div>
        </section>

        <div className="reveal-on-scroll">
          <ContextSection />
        </div>

        <div className="reveal-on-scroll">
          <MethodologySection />
        </div>

        <div className="reveal-on-scroll">
          <DataFooter />
        </div>
      </div>
    </main>
  );
}
