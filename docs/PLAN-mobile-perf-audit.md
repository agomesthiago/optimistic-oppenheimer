# PLAN-mobile-perf-audit.md — Plano de Testes Brutais de Desempenho Mobile, WCAG AAA, Tipos, SEO e Integração Local

> **Objetivo:** Estabelecer uma bateria completa de testes de alta exigência (*brutal stress testing*) focada prioritariamente em desempenho mobile (dispositivos de média/baixa capacidade), verificação estrita de conformidade WCAG AAA, segurança de tipos TypeScript, contraste cromático, métricas Lighthouse (100/100), SEO técnico e validação de integrações no sistema local.

---

## 1. Escopo e Matriz de Testes Brutais

### 1.1 Desempenho Real Mobile (Prioridade Alta)
- **Cenário de Estresse:** Simulação de throttling de CPU (4x a 6x slowdown) e conectividade móvel lenta (Fast 3G / Slow 3G).
- **Métricas Alvo (corrigidas conforme padrões oficiais Core Web Vitals):**
  - **LCP (Largest Contentful Paint) Mobile:** ≤ 2.5s ("bom"); meta interna agressiva de ≤ 1.2s.
  - **CLS (Cumulative Layout Shift):** ≤ 0.1 ("bom", padrão Google). Meta interna agressiva ≤ 0.02, não 0.000 — zero absoluto é praticamente inatingível em produção real.
  - **INP (Interaction to Next Paint):** ≤ 200ms ("bom", padrão oficial). Corrigido de 16ms, que é o orçamento de frame (60fps), não o limiar de INP.
  - **FPS em Rolagem Mobile:** 60 FPS cravados sem travamento de thread principal.
  - **TBT (Total Blocking Time):** ≤ 200ms — métrica adicional para capturar bloqueios de thread não cobertos por INP isoladamente.
  - **Consumo de Memória JS Heap:** < 30MB acumulados após 10 minutos de execução contínua do contador e rotação de carrossel.
  - **Bundle JS inicial (gzip):** ≤ 150KB.
  - **Peso total de fontes web:** ≤ 100KB, com `font-display: swap` obrigatório.

### 1.2 Prevenção de Layout Shift no Contador
- [ ] Reservar `min-width` calculado (via `ch` ou largura fixa em `tabular-nums`) no container do contador Hero, absorvendo a troca de dígitos (ex: "9.999" → "10.000") sem reflow.
- [ ] Testar o mesmo princípio nos contadores de "vidas interrompidas desde o primeiro acesso" e nos números de causas no `CauseTicker`.

### 1.3 Widget VLibras e Scripts de Terceiros
- [ ] Lazy-load do VLibras via `IntersectionObserver` ou gatilho de interação do usuário — nunca no carregamento inicial da página.
- [ ] Auditar qualquer outro script de terceiros (analytics, fontes externas) quanto a `async`/`defer` e impacto em TBT/LCP.

### 1.4 Audit WCAG 2.2 AAA & Cores/Contrastes
- **Razão de Contraste Ampliado (Critério 1.4.6 - AAA):** Medição de 100% dos pares foreground/background para garantir taxa mínima ≥ 7.0:1 em texto normal e ≥ 4.5:1 em texto grande.
- **Área de Toque Mínima (Critério 2.5.8 - AA/AAA Target):** Todos os botões, links, filtros e controles interativos devem ter área de toque de no mínimo 44×44px em telas sensíveis ao toque.
- **Identificação de Siglas (Critério 3.1.4 - AAA):** Envelopar 100% das siglas técnicas e institucionais em tags `<abbr title="...">`.
- **Movimento Reduzido (Critério 2.3.3 - AAA / Reinserido):** Toda animação (rotação do carrossel, transições de contador, blur decorativo) deve respeitar `prefers-reduced-motion: reduce`, desativando ou reduzindo dramaticamente a animação quando o usuário sinalizar essa preferência no sistema operacional.

### 1.5 Verificação Estrita de Tipos e Qualidade de Código
- **Checagem TypeScript:** `tsc -b --noEmit` em modo estrito (*strict mode*), sem nenhum uso de `any` explícito ou omissão de nulos.
- **Validação de Widgets:** Garantir compilação independente dos componentes de inserção (`mortality.js`, `embed.js`, `web-component.js`).

### 1.6 Teste de Auditoria Lighthouse & SEO Técnico
- **Pontuação Alvo em 4 Pilares:**
  - **Performance:** 100/100
  - **Accessibility:** 100/100
  - **Best Practices:** 100/100
  - **SEO:** 100/100
- **Validação SEO:** Grafo JSON-LD (`@graph`), meta tags OpenGraph/Twitter Cards, marcação de dados brutos para LLMs/SEO e estruturação de cabeçalhos.

### 1.7 Resiliência de Rede e Cache
- [ ] Avaliar viabilidade de um Service Worker básico para cache de assets estáticos (fontes, ícones, JSON de causas).
- [ ] Confirmar cabeçalhos `Cache-Control` adequados para assets versionados (hash no nome do arquivo + cache longo).

---

## 2. Roteiro de Execução Local em Fases

### Fase 1: Auditoria Estática & Tipagem (`tsc` & Linters)
- [ ] Executar checagem estática completa do TypeScript sem emitir arquivos.
- [ ] Auditar e eliminar qualquer aviso de dependência ou variável não utilizada.

### Fase 2: Otimização Mobile & Medição de Core Web Vitals
- [ ] Medir e otimizar a renderização do contador `Hero` em CPUs desaceleradas.
- [ ] Verificar a ausência de reflows causados pelo widget VLibras em dispositivos mobile.
- [ ] Validar lazy-load de scripts de terceiros.
- [ ] Medir peso de bundle JS e fontes web.

### Fase 3: Varredura de Contraste AAA, Área de Toque e Movimento Reduzido (Mobile)
- [ ] Garantir que 100% dos botões e chips tenham `min-h-[44px]` e `min-w-[44px]`.
- [ ] Elevar todas as combinações de cores secundárias para o patamar ≥ 7.0:1.
- [ ] Confirmar que `prefers-reduced-motion` desativa/reduz todas as animações contínuas do site.
- [ ] Validar prevenção de layout shift nos contadores numéricos.

### Fase 4: Relatório de Execução e Status Local
- [ ] Executar `npm run build` de produção.
- [ ] Rodar Lighthouse (mobile, throttling simulado) e `npx tsc -b --noEmit`.
- [ ] Reportar os resultados em tabela consolidada mantendo o isolamento local.

---

## 3. Nota de Transparência Metodológica

Métricas de performance real (LCP, CLS, INP, TBT, FPS, JS Heap) e resultados de Lighthouse/`tsc` exigem ferramentas de inspeção de DevTools/CLI que devem ser executadas diretamente no ambiente de desenvolvimento. Este plano define o alvo e o roteiro; a coleta de evidência numérica deve ser feita localmente e reportada para validação.
