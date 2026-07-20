const RESOURCES = [
  {
    id: 'cvv',
    name: 'CVV — Centro de Valorização da Vida',
    description: 'Apoio emocional e prevenção do suicídio. Atendimento gratuito, confidencial e disponível 24h por dia por telefone ou chat online.',
    action: 'Acessar Chat 24h',
    href: 'https://cvv.org.br/chat/',
  },
  {
    id: 'caps',
    name: 'CAPS — Centro de Atenção Psicossocial',
    description: 'Rede pública do SUS que oferece acolhimento especializado em saúde mental de forma gratuita e sem necessidade de agendamento.',
    action: 'Buscar CAPS no Google',
    href: 'https://www.google.com/search?q=CAPS+Centros+de+Aten%C3%A7%C3%A3o+Psicossocial+mais+pr%C3%B3ximo',
  },
  {
    id: 'atlas',
    name: 'Atlas da Violência — IPEA',
    description: 'Acesso a estudos detalhados, séries históricas e dados estruturados sobre segurança pública e violência no Brasil.',
    action: 'Acessar estudos',
    href: 'https://www.ipea.gov.br/atlasviolencia/',
  },
];

export function ResourcesSection() {
  return (
    <section
      id="recursos"
      aria-labelledby="recursos-heading"
      className="relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-white dark:bg-transparent"
    >
      <div className="max-w-2xl mx-auto">
        <h2
          id="recursos-heading"
          className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-12"
        >
          Ajuda
        </h2>

        <p className="text-slate-600 dark:text-ash-300 text-base mb-12 leading-relaxed">
          Se você ou alguém precisa de ajuda: cada indicador nesta página representa uma história interrompida. Se a visualização destes dados 
          te afetou de alguma forma, saiba que há suporte disponível. O acolhimento é sigiloso, humanizado e gratuito.
        </p>

        <div className="space-y-4">
          {RESOURCES.map((res) => (
            <a
              key={res.id}
              id={res.id}
              href={res.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-zinc-50 dark:bg-carbon-800 hover:bg-zinc-100 dark:hover:bg-carbon-700 border border-zinc-200 dark:border-carbon-700 hover:border-slate-300 dark:hover:border-ash-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-ash-500 shadow-sm"
              aria-label={`${res.name}: ${res.description}. ${res.action}`}
            >
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-semibold text-slate-800 dark:text-ash-200 group-hover:text-slate-900 dark:group-hover:text-ash-100 transition-colors">
                  {res.name}
                </span>
                <span className="text-sm text-slate-500 dark:text-ash-400">{res.description}</span>
              </div>
              <span className="shrink-0 text-sm font-mono text-slate-500 dark:text-ash-600 group-hover:text-slate-700 dark:group-hover:text-ash-400 transition-colors whitespace-nowrap">
                {res.action} →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Left Corner (Page indicator) */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-ash-600 text-left select-none">
        <span className="text-sm font-bold text-slate-600 dark:text-ash-400">.07</span>
      </div>
    </section>
  );
}
