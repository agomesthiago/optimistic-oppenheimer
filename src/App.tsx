import { useState, useEffect, lazy, Suspense } from 'react';
import { useCounter } from './hooks/useCounter';
import { Hero } from './components/Hero';
import { DataDisclaimer } from './components/DataDisclaimer';
import { StatsSection } from './components/StatsSection';
import { Header } from './components/Header';

import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollReveal } from './hooks/useScrollReveal';

const LifeExpectancySection = lazy(() => import('./components/LifeExpectancySection').then(m => ({ default: m.LifeExpectancySection })));
const TimelineSection = lazy(() => import('./components/TimelineSection').then(m => ({ default: m.TimelineSection })));
const SuicideSection = lazy(() => import('./components/SuicideSection').then(m => ({ default: m.SuicideSection })));
const CauseTicker = lazy(() => import('./components/CauseTicker').then(m => ({ default: m.CauseTicker })));
const EditorialSection = lazy(() => import('./components/EditorialSection').then(m => ({ default: m.EditorialSection })));
const ResourcesSection = lazy(() => import('./components/ResourcesSection').then(m => ({ default: m.ResourcesSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const DataFooter = lazy(() => import('./components/DataFooter').then(m => ({ default: m.DataFooter })));
const VLibrasWidget = lazy(() => import('./components/VLibrasWidget').then(m => ({ default: m.VLibrasWidget })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage').then(m => ({ default: m.MethodologyPage })));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage').then(m => ({ default: m.GlossaryPage })));

export default function App() {
  const { deaths, currentSessionSeconds, currentSessionDeaths, lifetimeDeaths, yearSeconds, isRunning } = useCounter();
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  useSmoothScroll();
  useScrollReveal();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isMethodologyPage = currentHash === '#metodologia';
  const isGlossaryPage = currentHash === '#glossario';

  return (
    <>
      {/* Widget Oficial de LIBRAS (Governo Federal) - Fora do overflow para não ser cortado */}
      <Suspense fallback={null}>
        <VLibrasWidget />
      </Suspense>

      <div className="relative min-h-dvh overflow-x-hidden">
        {/* FEATURE 17 — Skip Link de Acessibilidade */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:shadow-xl focus:font-mono focus:text-xs"
        >
          Pular para o conteúdo principal
        </a>

        <Header />

        {isMethodologyPage ? (
          <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-xs font-mono text-slate-500">Carregando metodologia científica...</div>}>
            <MethodologyPage />
          </Suspense>
        ) : isGlossaryPage ? (
          <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-xs font-mono text-slate-500">Carregando glossário epidemiológico...</div>}>
            <GlossaryPage />
          </Suspense>
        ) : (
          <>
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
                currentSessionSeconds={currentSessionSeconds}
                currentSessionDeaths={currentSessionDeaths}
                lifetimeDeaths={lifetimeDeaths}
                yearSeconds={yearSeconds} 
                isRunning={isRunning} 
              />
              
              <DataDisclaimer />
            </header>

            {/* Main Landmark */}
            <main id="main-content" role="main" className="relative z-10">
              {/* Estatísticas */}
              <div className="reveal-on-scroll">
                <StatsSection deaths={deaths} />
              </div>

              <Suspense fallback={<div className="min-h-96" />}>
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
                <section id="causas" data-testid="causes-section" aria-labelledby="causas-heading" className="reveal-on-scroll relative py-24 px-4 sm:px-6 border-t border-zinc-200 dark:border-carbon-700 bg-zinc-100 dark:bg-carbon-900/50 overflow-hidden">
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

                {/* Recursos de Apoio (Rede de Ajuda) */}
                <div className="reveal-on-scroll">
                  <ResourcesSection />
                </div>

                {/* FAQ */}
                <div className="reveal-on-scroll">
                  <FAQSection />
                </div>
              </Suspense>
            </main>
          </>
        )}

        {/* Footer Landmark */}
        <footer role="contentinfo" className="relative z-10">
          <Suspense fallback={null}>
            <DataFooter />
          </Suspense>
        </footer>


      </div>
    </>
  );
}

