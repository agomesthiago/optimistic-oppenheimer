import { useState, useId } from 'react';
import { FAQ_DATA } from '../data/faq';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const baseId = useId();

  const categories = ['Todas', 'Geral', 'Estatísticas', 'Longevidade', 'Suicídio', 'Causas', 'Metodologia', 'Apoio'];

  const filteredFaqs = activeCategory === 'Todas'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Structured Data JSON-LD for FAQPage (FEATURE 06 & FEATURE 03)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://vidasmasculinas.vercel.app/#faq-schema',
    'mainEntity': FAQ_DATA.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="reveal-on-scroll relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-50 dark:bg-carbon-900/40"
    >
      {/* FAQ Schema Injector */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Definition -> Context -> Data -> Conclusion Structure (FEATURE 09) */}
        <header className="mb-12">
          <h2
            id="faq-heading"
            className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-4"
          >
            Perguntas Frequentes & Repositório de Conhecimento (.09)
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-ash-100 tracking-tight mb-4">
            Respostas essenciais sobre mortalidade masculina, longevidade e prevenção no Brasil.
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-ash-300 leading-relaxed max-w-3xl">
            Compilado técnico de 50 questões fundamentais validadas com base em registros públicos federais do DATASUS (Ministério da Saúde) e IBGE.
          </p>
        </header>

        {/* Category Filters */}
        <nav
          aria-label="Filtro de categorias de perguntas frequentes"
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar select-none"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-ash-100 dark:text-carbon-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-carbon-800 text-slate-600 dark:text-ash-400 border border-zinc-200 dark:border-carbon-700 hover:border-slate-400'
              }`}
            >
              {cat} {cat === 'Todas' ? `(${FAQ_DATA.length})` : ''}
            </button>
          ))}
        </nav>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            const buttonId = `${baseId}-btn-${faq.id}`;
            const contentId = `${baseId}-content-${faq.id}`;

            return (
              <article
                key={faq.id}
                className="bg-white dark:bg-carbon-950 rounded-2xl border border-zinc-200 dark:border-carbon-800 overflow-hidden transition-colors"
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-ash-500"
                >
                  <div className="flex flex-col gap-1 pr-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-ash-600">
                      {String(index + 1).padStart(2, '0')} · {faq.category}
                    </span>
                    <span className="text-base font-semibold text-slate-900 dark:text-ash-100 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-lg text-slate-400 dark:text-ash-500 font-bold">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-carbon-900 text-sm text-slate-600 dark:text-ash-300 leading-relaxed font-sans">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Post-FAQ Counter */}
        <div className="mt-12 flex items-center justify-between gap-4 pt-6 border-t border-zinc-200 dark:border-carbon-800 font-mono text-xs">
          <span className="text-slate-500 dark:text-ash-500">
            Exibindo {filteredFaqs.length} de {FAQ_DATA.length} respostas catalogadas
          </span>
        </div>
      </div>

      {/* Bottom Left Page Indicator */}
      <div className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-ash-600 text-left select-none">
        <span className="text-sm font-bold text-slate-600 dark:text-ash-400">.09</span>
      </div>
    </section>
  );
}
