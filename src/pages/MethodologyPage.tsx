import { useEffect } from 'react';
import { MethodologySection } from '../components/MethodologySection';
import { ArrowLeft } from 'lucide-react';

export function MethodologyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" data-testid="methodology-page" className="min-h-dvh pt-24 pb-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto mb-8">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-carbon-900 border border-zinc-200 dark:border-carbon-800 text-slate-700 dark:text-ash-200 hover:text-crimson-600 dark:hover:text-crimson-400 font-mono text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar à página principal
        </a>
      </div>
      <MethodologySection />
    </main>
  );
}
