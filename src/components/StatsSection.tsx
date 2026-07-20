import { TOTAL_MALE_DEATHS_PER_YEAR, DEATHS_PER_SECOND, MALE_MORTALITY_RATE_PER_100K } from '../utils/mortality';

const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);
const YEAR_LABEL = new Date().getFullYear().toString();

interface StatsSectionProps {
  deaths: number;
}

export function StatsSection({ deaths }: StatsSectionProps) {
  const formattedDeaths = Math.floor(deaths).toLocaleString('pt-BR');

  return (
    <section
      id="estatisticas"
      className="relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-white dark:bg-transparent"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-16">
          Estatísticas Gerais
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none w-full">
          <Stat label={`em ${YEAR_LABEL}`} value={formattedDeaths} sublabel="estimativa acumulada" />
          <Stat label="média anual" value={`~${Math.round(TOTAL_MALE_DEATHS_PER_YEAR / 1000).toLocaleString('pt-BR')}k`} sublabel="óbitos masculinos (SIM/IBGE)" />
          <Stat label="taxa bruta" value={`~${MALE_MORTALITY_RATE_PER_100K}`} sublabel="óbitos / 100k homens" />
          <Stat label="por dia" value={`≈ ${DEATHS_PER_DAY.toLocaleString('pt-BR')}`} sublabel="média diária" />
        </div>
      </div>
      
      {/* Bottom Left Corner (Page indicator) */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-ash-600 text-left select-none">
        <span className="text-sm font-bold text-slate-600 dark:text-ash-400">.02</span>
      </div>
    </section>
  );
}

function Stat({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="group flex flex-col items-center gap-1.5 p-5 rounded-2xl bg-zinc-50/70 dark:bg-carbon-900/40 border border-zinc-200/60 dark:border-carbon-800 transition-all duration-300 hover:bg-white dark:hover:bg-carbon-800/60 hover:scale-105 cursor-default text-center">
      <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums transition-colors group-hover:text-crimson-500 dark:group-hover:text-crimson-400">
        {value}
      </span>
      <span className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-ash-400 font-semibold">
        {label}
      </span>
      <span className="text-[11px] text-slate-400 dark:text-ash-600 font-mono">
        {sublabel}
      </span>
    </div>
  );
}
