import { MORTALITY_SOURCES, LIFE_EXPECTANCY_DATA, SUICIDE_DATA } from '../utils/mortality';

export function DataFooter() {
  return (
    <footer id="footer" className="border-t border-zinc-200 dark:border-carbon-700 py-16 px-6 bg-zinc-100 dark:bg-carbon-900/30" role="contentinfo">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Sources */}
        <div>
          <p className="text-sm font-mono text-slate-500 dark:text-ash-600 uppercase tracking-widest mb-4">Fontes Oficiais</p>
          <ul className="space-y-3" role="list">
            {MORTALITY_SOURCES.map((src) => (
              <li key={src.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <a
                  href={src.url}
                  id={`source-${src.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-slate-700 dark:text-ash-400 hover:text-slate-900 dark:hover:text-ash-200 underline underline-offset-4 decoration-slate-300 dark:decoration-ash-600 hover:decoration-slate-500 dark:hover:decoration-ash-400 transition-colors"
                >
                  {src.institution}
                </a>
                <span className="text-sm font-mono text-slate-500 dark:text-ash-600">
                  {src.publication} — {src.year} · {src.totalMaleDeaths.toLocaleString('pt-BR')} óbitos
                </span>
              </li>
            ))}
            <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <a
                href={LIFE_EXPECTANCY_DATA.sourceUrl}
                id="source-ibge-life-expectancy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-slate-700 dark:text-ash-400 hover:text-slate-900 dark:hover:text-ash-200 underline underline-offset-4 decoration-slate-300 dark:decoration-ash-600 hover:decoration-slate-500 dark:hover:decoration-ash-400 transition-colors"
              >
                IBGE
              </a>
              <span className="text-sm font-mono text-slate-500 dark:text-ash-600">
                Tábuas Completas de Mortalidade — {LIFE_EXPECTANCY_DATA.year} · Expectativa: H {LIFE_EXPECTANCY_DATA.male.toFixed(1).replace('.', ',')}a / M {LIFE_EXPECTANCY_DATA.female.toFixed(1).replace('.', ',')}a
              </span>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <a
                href={SUICIDE_DATA.sourceUrl}
                id="source-ms-suicide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-slate-700 dark:text-ash-400 hover:text-slate-900 dark:hover:text-ash-200 underline underline-offset-4 decoration-slate-300 dark:decoration-ash-600 hover:decoration-slate-500 dark:hover:decoration-ash-400 transition-colors"
              >
                Ministério da Saúde / SIM
              </a>
              <span className="text-sm font-mono text-slate-500 dark:text-ash-600">
                Boletim Epidemiológico Suicídios — {SUICIDE_DATA.year} · {SUICIDE_DATA.malePercentage}% das vítimas eram homens
              </span>
            </li>
          </ul>
        </div>

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
                className="text-slate-400 dark:text-ash-600 hover:text-slate-800 dark:hover:text-ash-300 transition-colors duration-250"
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
                className="text-slate-400 dark:text-ash-600 hover:text-slate-800 dark:hover:text-ash-300 transition-colors duration-250"
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
                CVV <strong className="text-slate-700 dark:text-ash-400">188</strong>
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
