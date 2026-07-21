export function DataDisclaimer() {
  return (
    <section 
      aria-label="Sobre os dados apresentados" 
      className="w-full max-w-4xl mx-auto px-6 py-12 relative z-20"
    >
      <div className="p-6 sm:p-8 bg-zinc-100/80 dark:bg-carbon-900/60 backdrop-blur-sm border border-zinc-200 dark:border-carbon-800 rounded-2xl flex flex-col items-center text-sm font-sans shadow-sm">
        
        <div className="mb-6 flex flex-col items-center text-center max-w-2xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-carbon-950 border border-zinc-200 dark:border-carbon-800 text-slate-500 dark:text-ash-500 shadow-sm mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <p className="text-slate-600 dark:text-ash-400 leading-relaxed text-base">
            Os indicadores apresentados nesta página utilizam dados oficiais publicados pelo <strong>DATASUS</strong>, <strong>IBGE</strong> e <strong>Ministério da Saúde</strong>. Alguns números em tempo real representam projeções estatísticas derivadas dessas bases públicas e não contagens instantâneas.
          </p>
        </div>

        <div className="w-full max-w-lg mt-4 border-t border-zinc-200 dark:border-carbon-800 pt-8">
          <h4 className="text-center text-slate-900 dark:text-ash-100 font-bold mb-6 font-mono uppercase tracking-widest text-xs">Como interpretar estes números</h4>
          
          <div className="flex flex-col items-center space-y-3">
            <div className="w-full bg-white dark:bg-carbon-950 px-4 py-3 rounded-lg border border-zinc-200 dark:border-carbon-800 text-center text-slate-600 dark:text-ash-300">
              O contador não representa mortes registradas em tempo real.
            </div>
            
            <div className="text-slate-400 dark:text-ash-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            <div className="w-full bg-white dark:bg-carbon-950 px-4 py-3 rounded-lg border border-zinc-200 dark:border-carbon-800 text-center text-slate-600 dark:text-ash-300">
              Ele utiliza projeções estatísticas.
            </div>
            
            <div className="text-slate-400 dark:text-ash-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            <div className="w-full bg-white dark:bg-carbon-950 px-4 py-3 rounded-lg border border-zinc-200 dark:border-carbon-800 text-center text-slate-600 dark:text-ash-300">
              Os microdados oficiais possuem defasagem.
            </div>
            
            <div className="text-slate-400 dark:text-ash-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>

            <div className="w-full bg-white dark:bg-carbon-950 px-4 py-3 rounded-lg border border-zinc-200 dark:border-carbon-800 text-center text-slate-600 dark:text-ash-300 font-medium">
              Os valores são recalculados quando novas bases são publicadas.
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
