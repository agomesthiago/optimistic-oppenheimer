import { useState } from 'react';

export function CitationBlock() {
  const [copied, setCopied] = useState(false);
  
  const citationText = `Vidas Masculinas. (2026). Vidas Masculinas | Mortalidade Masculina no Brasil em Dados. Recuperado de https://vidasmasculinas.vercel.app/`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      aria-label="Como citar este projeto" 
      className="reveal-on-scroll relative py-12 px-6 bg-zinc-100 dark:bg-carbon-900 border-t border-zinc-200 dark:border-carbon-800"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-ash-100 mb-1">
              Como citar este projeto
            </h3>
            <p className="text-sm text-slate-600 dark:text-ash-400">
              Utilize o formato abaixo para referenciar o Vidas Masculinas em trabalhos acadêmicos ou reportagens.
            </p>
          </div>
          <button
            onClick={copyToClipboard}
            className="shrink-0 px-4 py-2 bg-white dark:bg-carbon-950 border border-zinc-300 dark:border-carbon-700 rounded-lg text-sm font-mono text-slate-700 dark:text-ash-300 hover:bg-zinc-50 dark:hover:bg-carbon-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-ash-500"
          >
            {copied ? 'Copiado ✓' : 'Copiar citação'}
          </button>
        </div>
        
        <div className="p-4 bg-white dark:bg-carbon-950 border border-zinc-200 dark:border-carbon-800 rounded-xl font-mono text-sm text-slate-700 dark:text-ash-300 overflow-x-auto">
          <code>{citationText}</code>
        </div>
      </div>
    </section>
  );
}
