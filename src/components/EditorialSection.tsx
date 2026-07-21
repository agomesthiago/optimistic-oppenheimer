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
            O que os números não mostram?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-ash-300 leading-relaxed max-w-3xl">
            A estatística revela <em>quantos</em> homens morrem, mas a ciência epidemiológica e a sociologia nos ajudam a entender <em>por que</em>. Abaixo, exploramos o comportamento estrutural por trás do silêncio dos dados.
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
              A resposta não se resume apenas à biologia. Fatores comportamentais, como a socialização masculina para reprimir dor e a exposição a trabalhos de alto risco, criam um padrão de morte prematura. A masculinidade tóxica, frequentemente, atua como um determinante de saúde, distanciando o homem do cuidado de si mesmo.
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
              Pesquisas indicam que homens buscam serviços de atenção primária no SUS com muito menos frequência que as mulheres. Como resultado, doenças perfeitamente tratáveis como hipertensão são diagnosticadas já na sala de emergência com quadros de infarto ou AVC.
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
              O número frio anestesia. Para compreender a magnitude da perda, deve-se observar a mortalidade proporcional. Quando 90% das vítimas de letalidade violenta são masculinas, o dado deixa de ser um número genérico de segurança pública e se torna uma grave falha sistêmica na proteção sociossanitária da juventude.
            </p>
          </article>

        </div>
      </div>
    </section>
  );
}
