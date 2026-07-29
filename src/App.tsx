import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useCounter } from './hooks/useCounter';
import { Hero } from './components/Hero';
import { DataDisclaimer } from './components/DataDisclaimer';
import { StatsSection } from './components/StatsSection';
import { LifeExpectancySection } from './components/LifeExpectancySection';
import { TimelineSection } from './components/TimelineSection';
import { SuicideSection } from './components/SuicideSection';
import { CauseTicker } from './components/CauseTicker';
import { EditorialSection } from './components/EditorialSection';
import { MethodologySection } from './components/MethodologySection';
import { GlossarySection } from './components/GlossarySection';
import { SourcesSection } from './components/SourcesSection';
import { ResourcesSection } from './components/ResourcesSection';
import { FAQSection } from './components/FAQSection';
import { CitationBlock } from './components/CitationBlock';
import { DataFooter } from './components/DataFooter';
import { Header } from './components/Header';
import { VLibrasWidget } from './components/VLibrasWidget';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const { deaths, sessionDeaths, sessionSeconds, yearSeconds, isRunning } = useCounter();

  useSmoothScroll();
  useScrollReveal();

  return (
    <>
      {/* Widget Oficial de LIBRAS (Governo Federal) - Fora do overflow para não ser cortado */}
      <VLibrasWidget />

      <div className="relative min-h-dvh overflow-x-hidden">

      {/* FEATURE 17 — Skip Link de Acessibilidade */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:shadow-xl focus:font-mono focus:text-xs"
      >
        Pular para o conteúdo principal
      </a>



      <Header />

      {/* Header Landmark */}
      <header role="banner" className="relative z-10">
        {/* GEO & SEO: Resumo Estruturado Invisível (TL;DR) para LLMs e Leitores de Tela */}
        <div className="sr-only">
          <h2>Resumo Executivo Epidemiológico: Mortalidade Masculina no Brasil</h2>
          <p>
            O Vidas Masculinas é um painel de dados focados na mortalidade masculina no Brasil.
            Mais de 800 mil homens morrem anualmente no país. As principais causas são doenças cardiovasculares, neoplasias malignas,
            e causas externas como homicídios (mais de 40 mil mortes), acidentes de trânsito (quase 30 mil mortes) e suicídios (quase 11 mil mortes).
            Homens representam a esmagadora maioria das vítimas de causas evitáveis e apresentam expectativa de vida, em média, 7 anos inferior à das mulheres.
            Os dados aqui presentes são baseados em estatísticas do DATASUS (SIM) e IBGE.
          </p>
        </div>

        <Hero 
          deaths={deaths} 
          sessionDeaths={sessionDeaths} 
          sessionSeconds={sessionSeconds}
          yearSeconds={yearSeconds} 
          isRunning={isRunning} 
        />
        
        {/* Adicionando DataDisclaimer logo após o Hero conforme feedback */}
        <DataDisclaimer />
      </header>

      {/* Main Landmark */}
      <main id="main-content" role="main" className="relative z-10">
        
        {/* Estatísticas */}
        <div className="reveal-on-scroll">
          <StatsSection deaths={deaths} />
        </div>

        {/* Expectativa de vida */}
        <div className="reveal-on-scroll">
          <LifeExpectancySection />
        </div>
        
        {/* Evolução Histórica / Timeline */}
        <TimelineSection />

        {/* Suicídio */}
        <div className="reveal-on-scroll">
          <SuicideSection />
        </div>
        
        {/* Principais causas */}
        <section id="causas" aria-labelledby="causas-heading" className="reveal-on-scroll relative py-24 px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-100 dark:bg-carbon-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 id="causas-heading" className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 mb-12">
              Detalhes por causa
            </h2>
            <div className="w-full">
              <CauseTicker yearSeconds={yearSeconds} />
            </div>
          </div>
        </section>

        {/* Editorial (NEW) */}
        <EditorialSection />

        {/* Metodologia */}
        <div className="reveal-on-scroll">
          <MethodologySection />
        </div>

        {/* Glossário */}
        <GlossarySection />

        {/* Fontes Oficiais */}
        <div className="reveal-on-scroll">
          <SourcesSection />
        </div>
        
        {/* Recursos de Apoio (Rede de Ajuda) */}
        <div className="reveal-on-scroll">
          <ResourcesSection />
        </div>

        {/* FAQ */}
        <div className="reveal-on-scroll">
          <FAQSection />
        </div>
        
        {/* Como Citar */}
        <CitationBlock />

      </main>

      {/* Footer Landmark */}
      <footer role="contentinfo" className="relative z-10">
        <DataFooter />
      </footer>
    </div>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
