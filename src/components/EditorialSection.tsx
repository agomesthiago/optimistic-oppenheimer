export function EditorialSection() {
  return (
    <section 
      id="editorial" 
      aria-labelledby="editorial-heading" 
      className="reveal-on-scroll relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900/40"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h2 
            id="editorial-heading" 
            className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-4"
          >
            Análise e Conhecimento
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-ash-100 tracking-tight mb-4">
            Por que tantos homens morrem antes do tempo?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-ash-300 leading-relaxed max-w-3xl">
            Os dados mostram <em>quantos</em> homens morrem. A ciência explica <em>por quê</em>. Quatro padrões estruturais que amplificam a mortalidade masculina no Brasil.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Article 1 */}
          <article className="p-8 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 flex flex-col h-full shadow-sm">
            <div className="mb-4 text-slate-400 dark:text-ash-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h4l3-9 5 18 3-9h5"></path>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-ash-100 mb-3">
              Por que os homens vivem menos?
            </h4>
            <p className="text-sm text-slate-600 dark:text-ash-400 leading-relaxed">
              Não é só biologia. Homens são socializados para reprimir dor, evitar médicos e se expor a trabalhos de alto risco. Esse padrão tem um custo: morte prematura. A ausência do cuidado não é uma escolha — é o resultado de uma cultura que confunde resistência com descaso consigo mesmo.
            </p>
          </article>

          {/* Article 2 */}
          <article className="p-8 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 flex flex-col h-full shadow-sm">
            <div className="mb-4 text-slate-400 dark:text-ash-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-ash-100 mb-3">
              O paradoxo da procura tardia
            </h4>
            <p className="text-sm text-slate-600 dark:text-ash-400 leading-relaxed">
              Homens procuram médico muito menos que mulheres. O resultado: doenças como hipertensão — que têm tratamento simples — só aparecem quando já viraram infarto ou AVC na sala de emergência.
            </p>
          </article>

          {/* Article 3 */}
          <article className="p-8 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 flex flex-col h-full shadow-sm">
            <div className="mb-4 text-slate-400 dark:text-ash-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M2 15h10"></path>
                <path d="m9 18 3-3-3-3"></path>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-ash-100 mb-3">
              Limitações das bases oficiais
            </h4>
            <p className="text-sm text-slate-600 dark:text-ash-400 leading-relaxed">
              Sistemas como o DATASUS possuem defasagens naturais de consolidação de 1 a 2 anos, devido ao rigor da validação das certidões de óbito. Além disso, existe o sub-registro: mortes não capturadas oficialmente e classificações genéricas ("causas mal definidas"), o que sugere que a realidade pode ser ainda mais severa.
            </p>
          </article>

          {/* Article 4 */}
          <article className="p-8 bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 flex flex-col h-full shadow-sm">
            <div className="mb-4 text-slate-400 dark:text-ash-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-ash-100 mb-3">
              Como interpretar as estatísticas
            </h4>
            <p className="text-sm text-slate-600 dark:text-ash-400 leading-relaxed">
              Quando 90% das vítimas de violência são homens, o dado deixa de ser uma estatística de segurança pública e se torna uma falha grave de proteção social. Número frio anestesia. Proporção revela.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}
