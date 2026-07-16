import { TOTAL_MALE_DEATHS_PER_YEAR, DEATHS_PER_SECOND, SECONDS_PER_DEATH } from '../utils/mortality';

const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);

const STEPS = [
  {
    step: '01',
    title: 'Fonte dos dados',
    body: 'SIM/DATASUS (Ministério da Saúde) e IBGE Registro Civil. Múltiplas fontes com média aritmética para reduzir viés de um único levantamento.',
  },
  {
    step: '02',
    title: 'Cálculo',
    body: `~${TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} óbitos masculinos/ano ÷ 31.557.600 s/ano = 1 morte a cada ~${Math.round(SECONDS_PER_DEATH)} segundos (~${DEATHS_PER_DAY.toLocaleString('pt-BR')}/dia).`,
  },
  {
    step: '03',
    title: 'Âncora',
    body: `01 jan ${new Date().getFullYear()} 00:00 BRT. Dinâmica — atualiza a cada virada de ano sem alteração de código.`,
  },
  {
    step: '04',
    title: 'Limitações',
    body: 'Estimativa baseada em média histórica. Não reflete mortes em tempo real. Dados têm latência de 1–3 anos.',
  },
];

export function MethodologySection() {
  return (
    <section
      id="metodologia"
      aria-labelledby="metodologia-heading"
      className="py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          id="metodologia-heading"
          className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-12 text-center"
        >
          Metodologia
        </h2>

        <div className="divide-y divide-zinc-200 dark:divide-carbon-700 border border-zinc-200 dark:border-carbon-700 bg-white dark:bg-carbon-950">
          {STEPS.map((item) => (
            <div key={item.step} className="flex gap-6 p-6 md:p-8">
              <span className="font-mono text-sm text-slate-400 dark:text-ash-600 pt-0.5 shrink-0">{item.step}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-slate-800 dark:text-ash-200">{item.title}</h3>
                <p className="text-slate-600 dark:text-ash-400 text-sm leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
