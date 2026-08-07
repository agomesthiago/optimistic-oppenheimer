import { 
  LIFE_EXPECTANCY_DATA,
  DEATHS_PER_DAY,
  MALE_MORTALITY_RATE_PER_100K,
  SUICIDE_DATA,
  formatDecimal,
  TOTAL_MALE_DEATHS_PER_YEAR,
  SECONDS_PER_DEATH,
  SECONDS_PER_YEAR
} from '../utils/mortality';
import { Abbr } from './Abbr';

const STEPS = [
  {
    step: '01',
    title: 'De onde vêm os dados?',
    body: (
      <>
        Do Ministério da Saúde: o Sistema de Informações sobre Mortalidade (<Abbr title="Sistema de Informações sobre Mortalidade">SIM</Abbr>/<Abbr title="Departamento de Informática do Sistema Único de Saúde">DATASUS</Abbr>), acessado via PCDaS/Fiocruz. E das tábuas de mortalidade do <Abbr title="Instituto Brasileiro de Geografia e Estatística">IBGE</Abbr>. Usamos médias históricas, descartando os anos atípicos da pandemia.
      </>
    ),
  },
  {
    step: '02',
    title: 'Como o contador funciona?',
    body: `${TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} mortes por ano ÷ ${SECONDS_PER_YEAR.toLocaleString('pt-BR')} segundos = 1 morte a cada ${Math.round(SECONDS_PER_DEATH)} segundos (${DEATHS_PER_DAY.toLocaleString('pt-BR')} por dia). O contador aplica essa taxa sobre o tempo já decorrido no ano.`,
  },
  {
    step: '03',
    title: 'Homens x Mulheres: como comparamos?',
    body: `Taxa de mortalidade masculina: ${MALE_MORTALITY_RATE_PER_100K} mortes por 100 mil homens. Suicídio: ${formatDecimal(SUICIDE_DATA.maleRatePer100k)} por 100k homens (vs ${formatDecimal(SUICIDE_DATA.femaleRatePer100k)} por 100k mulheres — uma razão de ${formatDecimal(SUICIDE_DATA.ratioMaleToFemale)}:1). Expectativa de vida: ${formatDecimal(LIFE_EXPECTANCY_DATA.male)} anos (H) vs ${formatDecimal(LIFE_EXPECTANCY_DATA.female)} anos (M).`,
  },
  {
    step: '04',
    title: 'Quando o contador reinicia?',
    body: `Em 1º de janeiro de cada ano, à meia-noite (horário de Brasília). O reinicio é automático — nenhuma intervenção manual no código é necessária.`,
  },
  {
    step: '05',
    title: 'O que este contador não mede?',
    body: 'Os números são médias históricas distribuídas uniformemente ao longo do ano. Variações sazonais não são consideradas. Os dados oficiais também têm uma defasagem natural de 1 a 2 anos para publicação.',
  },
];

export function MethodologySection() {
  return (
    <section
      id="metodologia"
      data-testid="methodology-section"
      aria-labelledby="metodologia-heading"
      className="relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900"
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
              <span className="font-mono text-sm text-slate-600 dark:text-ash-400 pt-0.5 shrink-0">{item.step}</span>
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
