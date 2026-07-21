import { useId, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TIMELINE_DATA = [
  {
    topic: 'Expectativa de Vida',
    title: 'O fosso que não fecha',
    description: 'Historicamente, a expectativa de vida masculina cresceu, mas a diferença de 7 anos a menos em relação às mulheres permanece estagnada há décadas, impulsionada por mortes evitáveis e menor procura preventiva.'
  },
  {
    topic: 'Suicídio',
    title: 'Uma epidemia silenciosa',
    description: 'Com taxas crescentes, os homens hoje representam quase 80% das vítimas de suicídio no Brasil. O estigma sobre a vulnerabilidade emocional afasta a população masculina do suporte psicológico.'
  },
  {
    topic: 'Violência',
    title: 'A principal causa entre jovens',
    description: 'Mais de 90% das vítimas de mortes violentas intencionais são homens, afetando desproporcionalmente a juventude (15 a 29 anos) e configurando o principal fator de perda de anos potenciais de vida.'
  },
  {
    topic: 'Doenças Cardiovasculares',
    title: 'A liderança na maturidade',
    description: 'Lideram como a principal causa absoluta (25,4% dos óbitos). A falta de acompanhamento de rotina faz com que hipertensão e diabetes sejam diagnosticadas frequentemente em estágios avançados ou durante emergências.'
  },
  {
    topic: 'Acidentes',
    title: 'O impacto no trânsito',
    description: 'Homens representam mais de 80% das vítimas fatais em sinistros de transporte terrestre. Comportamentos de risco, consumo de álcool e exposição prolongada em transportes e profissões logísticas são os vetores centrais.'
  }
];

export function TimelineSection() {
  const baseId = useId();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section 
      id="linha-do-tempo" 
      aria-labelledby="timeline-heading" 
      className="reveal-on-scroll relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-white dark:bg-carbon-950 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 
              id="timeline-heading" 
              className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-4"
            >
              Evolução de Indicadores
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-ash-100 tracking-tight mb-4">
              Como a mortalidade masculina mudou nas últimas décadas
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-ash-300 leading-relaxed">
              A estagnação da expectativa de vida reflete o comportamento sistêmico de causas que poderiam ser 100% prevenidas com políticas e conscientização direcionadas.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="p-2 rounded-full border border-zinc-200 dark:border-carbon-800 text-slate-600 dark:text-ash-400 hover:bg-zinc-100 dark:hover:bg-carbon-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ash-500"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="p-2 rounded-full border border-zinc-200 dark:border-carbon-800 text-slate-600 dark:text-ash-400 hover:bg-zinc-100 dark:hover:bg-carbon-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-ash-500"
              aria-label="Próximo slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        {/* Embla Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 pb-8">
            {TIMELINE_DATA.map((item, idx) => (
              <div 
                key={`${baseId}-${idx}`} 
                className="relative flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_30%] min-w-0"
              >
                <div className="h-full bg-zinc-50 dark:bg-carbon-900 border border-zinc-200/50 dark:border-carbon-800/50 rounded-2xl p-6 hover:border-zinc-300 dark:hover:border-carbon-700 transition-colors">
                  <span className="inline-block px-3 py-1 mb-4 rounded-full bg-slate-900 dark:bg-ash-200 text-white dark:text-carbon-900 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    {item.topic}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-ash-100 tracking-tight mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-ash-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
