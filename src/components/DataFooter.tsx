import { MORTALITY_SOURCES, TOTAL_MALE_DEATHS_PER_YEAR, DEATHS_PER_SECOND } from '../utils/mortality';

const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);

export function DataFooter() {
  return (
    <footer id="footer" className="border-t border-zinc-200 dark:border-carbon-700 py-16 px-6 bg-zinc-100 dark:bg-carbon-900/30" role="contentinfo">
      <div className="max-w-2xl mx-auto space-y-10">

        {/* Formula */}
        <div>
          <p className="text-sm font-mono text-slate-500 dark:text-ash-600 uppercase tracking-widest mb-4">Fórmula</p>
          <div className="font-mono text-sm text-slate-600 dark:text-ash-400 bg-white dark:bg-carbon-800 border border-zinc-200 dark:border-carbon-700 p-6 leading-relaxed overflow-x-auto shadow-sm">
            <p className="text-slate-800 dark:text-ash-200">
              taxa = {TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} / 31.557.600 s
            </p>
            <p className="text-slate-500 dark:text-ash-600 mt-2">
              ≈ {(DEATHS_PER_SECOND).toFixed(5)} mortes/segundo · ~{DEATHS_PER_DAY.toLocaleString('pt-BR')}/dia
            </p>
          </div>
        </div>

        {/* Sources */}
        <div>
          <p className="text-sm font-mono text-slate-500 dark:text-ash-600 uppercase tracking-widest mb-4">Fontes</p>
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
          </ul>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-zinc-200 dark:border-carbon-700 pt-6 gap-4">
          <span className="text-xs font-mono text-slate-500 dark:text-ash-600 text-center sm:text-left">
            média calculada · não representa mortes em tempo real
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-ash-600">
            CVV <strong className="text-slate-700 dark:text-ash-400">188</strong>
          </span>
        </div>

      </div>
    </footer>
  );
}
