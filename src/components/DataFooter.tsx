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

        {/* DNS Pointing Guide */}
        <div>
          <p className="text-sm font-mono text-slate-500 dark:text-ash-600 uppercase tracking-widest mb-4">Aponte seu domínio</p>
          <div className="font-mono text-sm text-slate-600 dark:text-ash-400 bg-white dark:bg-carbon-800 border border-zinc-200 dark:border-carbon-700 p-6 leading-relaxed space-y-4 shadow-sm">
            <p className="text-slate-800 dark:text-ash-200">
              Se você possui um domínio próprio e quer que ele aponte para este projeto, configure um registro <strong className="text-slate-900 dark:text-ash-100">CNAME</strong> no DNS do seu provedor:
            </p>
            <div className="bg-zinc-50 dark:bg-carbon-900 border border-zinc-200 dark:border-carbon-700 p-4 rounded overflow-x-auto">
              <p className="text-slate-700 dark:text-ash-300"><strong>Tipo:</strong> CNAME</p>
              <p className="text-slate-700 dark:text-ash-300"><strong>Host:</strong> @ <span className="text-slate-400 dark:text-ash-600">(ou www)</span></p>
              <p className="text-slate-700 dark:text-ash-300"><strong>Valor:</strong> vidasmasculinas.netlify.app</p>
            </div>
            <p className="text-slate-500 dark:text-ash-600 text-xs">
              Após configurar o CNAME, entre em contato para que possamos adicionar seu domínio personalizado no painel do Netlify. A propagação DNS leva até 48h.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-6 border-t border-zinc-200 dark:border-carbon-700 pt-8">
          
          {/* Contra o Esquecimento */}
          <div className="text-center space-y-2">
            <p className="text-xs font-mono text-slate-500 dark:text-ash-500">
              projeto pessoal · parte da iniciativa
            </p>
            <a
              href="https://obrasprimas.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-mono font-semibold text-slate-700 dark:text-ash-300 hover:text-crimson-500 dark:hover:text-crimson-400 underline underline-offset-4 decoration-slate-300 dark:decoration-ash-600 hover:decoration-crimson-500 transition-colors"
            >
              Contra o Esquecimento
            </a>
            <p className="text-xs font-mono text-slate-400 dark:text-ash-600 italic max-w-sm mx-auto">
              A história da beleza registrada em forma, cor e pedra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <span className="text-xs font-mono text-slate-500 dark:text-ash-600 text-center sm:text-left">
              média calculada · não representa mortes em tempo real
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-ash-600">
              CVV <strong className="text-slate-700 dark:text-ash-400">188</strong>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
