import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { CauseTicker } from './components/CauseTicker';
import { ContextSection } from './components/ContextSection';
import { MethodologySection } from './components/MethodologySection';
import { ResourcesSection } from './components/ResourcesSection';
import { DataFooter } from './components/DataFooter';
import { ThemeToggle } from './components/ThemeToggle';
import { getSecondsSinceYearStart } from './utils/mortality';

export default function App() {
  const [yearSeconds, setYearSeconds] = useState(() => getSecondsSinceYearStart());

  useEffect(() => {
    const id = setInterval(() => setYearSeconds(getSecondsSinceYearStart()), 1000);
    return () => clearInterval(id);
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
        <Hero />
        
        <ResourcesSection />
        
        {/* Dedicated Causes Section */}
        <section className="py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-100 dark:bg-carbon-900/50">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-12">
              Detalhes por causa
            </h2>
            <CauseTicker yearSeconds={yearSeconds} />
          </div>
        </section>

        <ContextSection />
        <MethodologySection />
        <DataFooter />
      </div>
    </main>
  );
}
