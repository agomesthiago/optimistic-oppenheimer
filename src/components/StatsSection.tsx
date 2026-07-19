import { TOTAL_MALE_DEATHS_PER_YEAR, DEATHS_PER_SECOND } from '../utils/mortality';

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
      className="py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-white dark:bg-transparent"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header aligned on the left */}
        <div className="flex items-center gap-4 mb-16 select-none">
          <span className="text-sm font-mono font-bold text-slate-400 dark:text-ash-600">.02</span>
          <div className="h-px w-8 bg-zinc-200 dark:bg-carbon-800" />
          <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400">
            Estatísticas
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-6 select-none w-full">
          <Stat label={`em ${YEAR_LABEL}`} value={formattedDeaths} sublabel="estimativa" />
          <div className="w-12 h-px sm:w-px sm:h-12 bg-zinc-250 dark:bg-carbon-800" />
          <Stat label="média anual" value={TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} sublabel="todas as causas" />
          <div className="w-12 h-px sm:w-px sm:h-12 bg-zinc-250 dark:bg-carbon-800" />
          <Stat label="por dia" value={`≈ ${DEATHS_PER_DAY.toLocaleString('pt-BR')}`} sublabel="mortes" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="group flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-zinc-100/60 dark:hover:bg-carbon-800/60 hover:scale-105 cursor-default flex-1 text-center">
      <span className="text-3xl font-mono font-bold text-slate-900 dark:text-ash-100 tabular-nums transition-colors group-hover:text-crimson-500 dark:group-hover:text-crimson-400">
        {value}
      </span>
      <span className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-ash-400">
        {label}
      </span>
      <span className="text-xs text-slate-400 dark:text-ash-600 font-mono">
        {sublabel}
      </span>
    </div>
  );
}
