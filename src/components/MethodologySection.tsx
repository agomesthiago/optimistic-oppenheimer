import { TOTAL_MALE_DEATHS_PER_YEAR, DEATHS_PER_SECOND, SECONDS_PER_DEATH, MALE_MORTALITY_RATE_PER_100K, SUICIDE_DATA, LIFE_EXPECTANCY_DATA } from '../utils/mortality';

const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);

const STEPS = [
  {
    step: '01',
    title: 'Fontes de Dados Oficiais',
    body: 'Sistema de Informações sobre Mortalidade (SIM/DATASUS - Ministério da Saúde) e Tábuas Completas de Mortalidade do IBGE. Utiliza-se a média ponderada de anos consolidados recentes para mitigar anomalias pontuais.',
  },
  {
    step: '02',
    title: 'Estimativa Temporal em Tempo Real',
    body: `~${TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} óbitos masculinos/ano ÷ 31.557.600 s/ano = 1 morte a cada ~${Math.round(SECONDS_PER_DEATH)} segundos (~${DEATHS_PER_DAY.toLocaleString('pt-BR')}/dia).`,
  },
  {
    step: '03',
    title: 'Taxas Populacionais & Comparação por Sexo',
    body: `Taxa bruta de mortalidade masculina: ~${MALE_MORTALITY_RATE_PER_100K} óbitos por 100 mil homens. Mortalidade por suicídio: ${SUICIDE_DATA.maleRatePer100k.toString().replace('.', ',')} por 100k homens (vs ${SUICIDE_DATA.femaleRatePer100k.toString().replace('.', ',')} por 100k mulheres, razão ${SUICIDE_DATA.ratioMaleToFemale.toString().replace('.', ',')}:1). Longevidade ao nascer: ${LIFE_EXPECTANCY_DATA.male.toFixed(1).replace('.', ',')} anos (H) vs ${LIFE_EXPECTANCY_DATA.female.toFixed(1).replace('.', ',')} anos (M).`,
  },
  {
    step: '04',
    title: 'Âncora Temporal',
    body: `01 jan ${new Date().getFullYear()} 00:00 BRT. O contador reinicia dinamicamente a cada virada de ano sem necessidade de intervenção manual no código.`,
  },
  {
    step: '05',
    title: 'Limitações & Transparência',
    body: 'Trata-se de uma projeção matemática baseada na média histórica consolidada dos órgãos governamentais. Os microdados oficiais têm latência de publicação de 1 a 2 anos.',
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
          className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-12"
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

      {/* Bottom Left Corner (Page indicator) */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-ash-600 text-left select-none">
        <span className="text-sm font-bold text-slate-600 dark:text-ash-400">.08</span>
      </div>
    </section>
  );
}
