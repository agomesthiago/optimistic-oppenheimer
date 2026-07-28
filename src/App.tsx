import { useEffect } from 'react';
import { useCounter } from './hooks/useCounter';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { LifeExpectancySection } from './components/LifeExpectancySection';
import { SuicideSection } from './components/SuicideSection';
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
          <LifeExpectancySection />
        </div>

        <div className="reveal-on-scroll">
          <SuicideSection />
        </div>
        
        {/* Dedicated Causes Section */}
        <section id="causas" className="reveal-on-scroll relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-100 dark:bg-carbon-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-12">
              Detalhes por causa
            </h2>
            <div className="w-full">
              <CauseTicker />
            </div>
          </div>
        </section>

        <div className="reveal-on-scroll">
          <ContextSection />
        </div>

        <div className="reveal-on-scroll">
          <ResourcesSection />
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
