

import dataset from '../config/dataset.json';

export function DataFooter() {
  return (
    <footer id="footer" className="border-t border-zinc-200 dark:border-carbon-700 py-16 px-6 bg-zinc-100 dark:bg-carbon-900/30" role="contentinfo">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Header Links Repeated */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 border-b border-zinc-200 dark:border-carbon-700 pb-8">
          {[
            { name: 'Stats', href: '#estatisticas' },
            { name: 'Longevidade', href: '#expectativa-vida' },
            { name: 'Suicídio', href: '#suicidios' },
            { name: 'Causas', href: '#causas' },
            { name: 'Método', href: '#metodologia' },
            { name: 'FAQ', href: '#faq' },
          ].map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-[11px] sm:text-xs font-mono tracking-widest uppercase text-slate-500 dark:text-ash-400 hover:text-slate-800 dark:hover:text-ash-200 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:188"
            className="px-4 py-1.5 rounded-full bg-crimson-600 hover:bg-crimson-700 text-white text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold transition-colors shadow-sm ml-0 sm:ml-4"
          >
            Fale com CVV 188
          </a>
        </nav>

        {/* Governance & Public Dataset Info */}
        <section aria-label="Governança Pública do Dataset" className="border-b border-zinc-200 dark:border-carbon-700 pb-8 space-y-4 text-xs font-mono text-slate-600 dark:text-ash-400">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="block font-bold uppercase tracking-wider text-slate-700 dark:text-ash-200">Dataset</span>
              <span>{dataset.name}</span>
            </div>
            <div>
              <span className="block font-bold uppercase tracking-wider text-slate-700 dark:text-ash-200">Última atualização</span>
              <span>{dataset.lastUpdateBR}</span>
            </div>
            <div>
              <span className="block font-bold uppercase tracking-wider text-slate-700 dark:text-ash-200">Metodologia</span>
              <span>consulte a seção &quot;Metodologia&quot; desta página.</span>
            </div>
          </div>
          <div className="pt-2">
            <span className="block font-bold uppercase tracking-wider text-slate-700 dark:text-ash-200 mb-1">Changelog Público</span>
            <div className="text-[11px] text-slate-500 dark:text-ash-400 space-y-0.5">
              <span className="block font-semibold text-slate-600 dark:text-ash-300">{dataset.changelog[0].version}</span>
              {dataset.changelog[0].changes.map((change, i) => (
                <span key={i} className="block">• {change}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-6 border-t border-zinc-200 dark:border-carbon-700 pt-8">
          
          {/* Contra o Esquecimento */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-500">
              Contra o Esquecimento
            </span>
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/contraoesquecimento/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram — Contra o Esquecimento"
                className="text-slate-400 dark:text-ash-600 hover:text-slate-800 dark:hover:text-ash-300 transition-colors duration-200"
                aria-label="Instagram Contra o Esquecimento"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://obrasprimas.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                title="Website — Contra o Esquecimento"
                className="text-slate-400 dark:text-ash-600 hover:text-slate-800 dark:hover:text-ash-300 transition-colors duration-200"
                aria-label="Website Contra o Esquecimento"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <span className="text-xs font-mono text-slate-500 dark:text-ash-600 text-center sm:text-left">
              média calculada · não representa mortes em tempo real
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-slate-500 dark:text-ash-600">
                Fale com CVV <strong className="text-slate-700 dark:text-ash-400">188</strong>
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
