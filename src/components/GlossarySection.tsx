export function GlossarySection() {
  const GLOSSARY_TERMS = [
    {
      term: 'Mortalidade',
      definition: 'Número de óbitos ocorridos em uma determinada população, espaço de tempo e local. O indicador reflete a letalidade de doenças ou causas externas estruturais de uma sociedade.'
    },
    {
      term: 'Incidência',
      definition: 'Frequência de novos casos de uma doença ou agravo em um período específico. Auxilia a medir a velocidade com que uma condição se espalha ou afeta a população masculina.'
    },
    {
      term: 'Prevalência',
      definition: 'Proporção total de indivíduos em uma população que possuem uma doença em um determinado momento, somando casos novos e antigos. Revela o peso crônico de um problema.'
    },
    {
      term: 'Coeficiente',
      definition: 'Razão matemática que mede o risco ou a probabilidade de um evento, como o adoecimento ou a morte, ocorrer em uma população específica durante determinado intervalo de tempo.'
    },
    {
      term: 'Taxa por 100 mil',
      definition: 'Padronização estatística utilizada para comparar o risco de mortalidade entre diferentes regiões ou populações independentemente do tamanho total de seus habitantes, garantindo precisão epidemiológica.'
    },
    {
      term: 'SIM',
      definition: 'Sistema de Informações sobre Mortalidade, gerenciado pelo Ministério da Saúde, que registra nacionalmente as declarações de óbito, documentando as causas básicas e perfis demográficos.'
    },
    {
      term: 'DATASUS',
      definition: 'Departamento de Informática do SUS. Órgão federal responsável por coletar, processar e disseminar bases de dados essenciais para o planejamento em saúde pública no Brasil.'
    },
    {
      term: 'CAPS',
      definition: 'Centros de Atenção Psicossocial. Unidades de porta aberta do SUS que oferecem atendimento gratuito, especializado e comunitário para casos severos e persistentes de sofrimento psíquico.'
    },
    {
      term: 'YLL',
      definition: 'Anos de Vida Perdidos (Years of Life Lost). Indicador que calcula o tempo de vida que uma pessoa perdeu ao morrer prematuramente antes da expectativa de vida ideal.'
    },
    {
      term: 'Carga de doença',
      definition: 'Métrica abrangente que avalia o impacto de um problema de saúde em uma população, combinando os anos de vida perdidos (YLL) com os anos vividos com incapacidade.'
    }
  ];

  return (
    <section 
      id="glossario" 
      aria-labelledby="glossary-heading" 
      className="reveal-on-scroll relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-white dark:bg-carbon-950"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 
            id="glossary-heading" 
            className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-4"
          >
            Glossário
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-ash-100 tracking-tight mb-4">
            Como interpretar os indicadores de saúde
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-ash-300 leading-relaxed max-w-2xl">
            Compreenda o vocabulário técnico utilizado para dimensionar a saúde da população.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {GLOSSARY_TERMS.map((item, idx) => (
            <div key={idx} className="pb-6 border-b border-zinc-100 dark:border-carbon-800/60 last:border-0 sm:[&:nth-last-child(-n+2)]:border-0">
              <dt className="text-base font-bold text-slate-900 dark:text-ash-100 mb-2 font-mono">
                {item.term}
              </dt>
              <dd className="text-sm text-slate-600 dark:text-ash-400 leading-relaxed">
                {item.definition}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
