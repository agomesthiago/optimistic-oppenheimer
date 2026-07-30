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
    title: 'Fontes de Dados Oficiais',
    body: (
      <>
        Sistema de Informações sobre Mortalidade (<Abbr title="Sistema de Informações sobre Mortalidade">SIM</Abbr>/<Abbr title="Departamento de Informática do Sistema Único de Saúde">DATASUS</Abbr> - Ministério da Saúde via PCDaS/Fiocruz) e Tábuas Completas de Mortalidade do <Abbr title="Instituto Brasileiro de Geografia e Estatística">IBGE</Abbr>. Os dados baseiam-se numa média anualizada das séries históricas dos microdados, expurgando anomalias pandêmicas.
      </>
    ),
  },
  {
    step: '02',
    title: 'Cálculo Anualizado Contínuo',
    body: `${TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} óbitos masculinos/ano ÷ ${SECONDS_PER_YEAR.toLocaleString('pt-BR')} s/ano = 1 morte a cada ${Math.round(SECONDS_PER_DEATH)} segundos (${DEATHS_PER_DAY.toLocaleString('pt-BR')}/dia).`,
  },
  {
    step: '03',
    title: 'Taxas Populacionais & Comparação por Sexo',
    body: `Taxa bruta de mortalidade masculina: ${MALE_MORTALITY_RATE_PER_100K} óbitos por 100 mil homens. Mortalidade por suicídio: ${formatDecimal(SUICIDE_DATA.maleRatePer100k)} por 100k homens (vs ${formatDecimal(SUICIDE_DATA.femaleRatePer100k)} por 100k mulheres, razão ${formatDecimal(SUICIDE_DATA.ratioMaleToFemale)}:1). Longevidade ao nascer: ${formatDecimal(LIFE_EXPECTANCY_DATA.male)} anos (H) vs ${formatDecimal(LIFE_EXPECTANCY_DATA.female)} anos (M).`,
  },
  {
    step: '04',
    title: 'Âncora Temporal',
    body: `01 jan ${new Date().getFullYear()} 00:00 BRT. O contador reinicia dinamicamente a cada virada de ano sem necessidade de intervenção manual no código.`,
  },
  {
    step: '05',
    title: 'Limitações & Transparência',
    body: 'Os dados refletem o volume médio histórico anualizado. Os microdados oficiais têm latência natural de publicação.',
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
