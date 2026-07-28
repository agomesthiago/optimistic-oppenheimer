# 🔍 Varredura Completa de Refatoração, Otimização e Limpeza

> **Projeto:** Vidas Masculinas (optimistic-oppenheimer)  
> **Data:** 2026-07-28  
> **Escopo:** Todos os arquivos de código-fonte, configuração e assets  
> **Linter:** oxlint → 0 erros, 0 warnings (26 arquivos, 104 regras)

---

## 🚨 1. BUGS CRÍTICOS

### 1.1 Edge Function `og-injector.ts` — Regex nunca casa com Twitter meta tags

**Arquivo:** `netlify/edge-functions/og-injector.ts:47-54`

A edge function busca `<meta property="twitter:title"` e `<meta property="twitter:description"`, mas o `index.html` usa `<meta name="twitter:title"` e `<meta name="twitter:description"`. O atributo `property` é para Open Graph; o atributo `name` é para Twitter Cards.

```ts
// ❌ No edge function — busca property, mas HTML usa name
/<meta property="twitter:title" content=".*?"\s*\/?>/,

// ✅ No index.html — usa name
<meta name="twitter:title" content="Vidas Masculinas | Mortalidade Masculina no Brasil" />
```

**Impacto:** Ao compartilhar URLs `/share/{count}`, os metadados dinâmicos do Twitter nunca são injetados. O preview do Twitter sempre mostrará o título/descrição padrão.

**Correção:** Trocar `property` por `name` nos regexes do Twitter, ou usar um regex que aceite ambos: `/<meta (?:property|name)="twitter:title"[^>]*>/`.

---

### 1.2 Ano hardcoded "2026" em textos visíveis

**Arquivos:**
- `src/components/CauseTicker.tsx:122` — `"desde 01/01/2026"`
- `src/components/StoryCard.tsx:42` — `"desde 01/01/2026"`

**Impacto:** Em 1º de janeiro de 2027, o texto exibirá "2026" incorretamente. O resto do projeto já usa `getCounterStartDate()` e `new Date().getFullYear()` dinamicamente.

**Correção:** Usar `EPOCH_LABEL` (já existente em `Hero.tsx`) ou `new Date().getFullYear()`.

---

### 1.3 `MethodologySection` — Page indicator com `absolute` mas sem `relative` no pai

**Arquivo:** `src/components/MethodologySection.tsx:56`

O `<section>` não tem a classe `relative`, mas o page indicator `.08` usa `absolute bottom-8 left-8`. Isso faz o indicador posicionar-se relativo ao ancestral posicionado mais próximo (possivelmente a `<main>` ou a `<div>` wrapper), não à seção.

**Correção:** Adicionar `relative` à classe do `<section>`.

---

## ⚡ 2. PERFORMANCE

### 2.1 `useCounter` — `requestAnimationFrame` com `setState` a cada ~80ms

**Arquivo:** `src/hooks/useCounter.ts:14`

O `TICK_MS = 80` gera ~12.5 re-renders por segundo. O valor exibido é um inteiro formatado (`Math.floor(deaths)`), que muda a cada ~40 segundos. Isso significa que ~499 de cada 500 renders são desnecessários.

**Sugestão:** Aumentar `TICK_MS` para 200-250ms ou usar `useRef` para o valor do contador e atualizar o DOM diretamente via `ref`, evitando re-renders.

---

### 2.2 Três timers independentes para `yearSeconds`

**Arquivos:**
- `src/hooks/useCounter.ts` — já calcula `getSecondsSinceYearStart()` a cada tick
- `src/components/Hero.tsx:72` — `setInterval(() => setYearSeconds(...), 1000)`
- `src/components/CauseTicker.tsx:21` — `setInterval(() => setYearSeconds(...), 1000)`

**Impacto:** Dois `setInterval`s adicionais que replicam dados já calculados pelo `useCounter`. Cada um causa re-renders a cada segundo.

**Sugestão:** Expor `yearSeconds` do `useCounter` (ou derivá-lo de `deaths`/`DEATHS_PER_SECOND`) e passar como prop, eliminando os timers duplicados.

---

### 2.3 `gsap` — dependência pesada para uma única animação

**Arquivo:** `src/components/Hero.tsx:6`

O `gsap` é importado (~30KB gzipped) para uma única animação de transição de modo (y/opacity/blur). Isso pode ser substituído por CSS transitions com `@keyframes` ou pela API nativa `View Transitions`.

**Sugestão:** Remover `gsap` e usar CSS transitions:
```css
.mode-transition {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s, filter 0.6s;
}
```

---

### 2.4 `@import url()` para Google Fonts bloqueia renderização

**Arquivo:** `src/index.css:1`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;600;700&display=swap');
```

O `@import` em CSS bloqueia a renderização. O navegador precisa baixar o CSS do Google Fonts antes de processar o resto.

**Sugestão:** Mover para `<link rel="preload">` no `index.html` com `font-display: swap`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />
```

---

### 2.5 `useShare` — `fetch(dataUrl)` para converter data URL em Blob

**Arquivo:** `src/hooks/useShare.ts:24`

```ts
const blob = await (await fetch(dataUrl)).blob();
```

Isso cria uma requisição de rede falsa para converter data URL → Blob. Existe uma abordagem mais eficiente (sem rede):

```ts
function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] || 'image/png';
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type: mime });
}
```

---

## 🔁 3. DUPLICAÇÃO DE CÓDIGO

### 3.1 `EPOCH_LABEL` — calculado em 2 arquivos

**Arquivos:**
- `src/components/Hero.tsx:52-55`
- `src/components/StoryCard.tsx:14-17`

**Código duplicado:**
```ts
const EPOCH_LABEL = getCounterStartDate().toLocaleDateString('pt-BR', {
  day: '2-digit', month: '2-digit', year: 'numeric',
});
```

**Sugestão:** Exportar de `mortality.ts` como `EPOCH_LABEL`.

---

### 3.2 `DEATHS_PER_DAY` — calculado em 3 arquivos

**Arquivos:**
- `src/components/StatsSection.tsx:5`
- `src/components/ContextSection.tsx:5`
- `src/components/MethodologySection.tsx:5`

**Código duplicado:**
```ts
const DEATHS_PER_DAY = Math.round(DEATHS_PER_SECOND * 86_400);
```

**Sugestão:** Exportar de `mortality.ts` como `DEATHS_PER_DAY`.

---

### 3.3 `.replace('.', ',')` — padrão pt-BR repetido 16 vezes

**Arquivos:** `CauseStoryCard.tsx`, `CauseTicker.tsx`, `ContextSection.tsx`, `DataFooter.tsx`, `LifeExpectancySection.tsx`, `MethodologySection.tsx`, `SuicideSection.tsx`

**Padrões encontrados:**
- `.toFixed(1).replace('.', ',')` — 7 ocorrências
- `.toString().replace('.', ',')` — 6 ocorrências
- Outras variações — 3 ocorrências

**Sugestão:** Criar `formatDecimal(value: number, decimals?: number): string` em `mortality.ts`:
```ts
export function formatDecimal(value: number, decimals = 1): string {
  return value.toFixed(decimals).replace('.', ',');
}
```

---

### 3.4 Ícone SVG de compartilhar — duplicado inline

**Arquivos:**
- `src/components/Hero.tsx:233-241`
- `src/components/CauseTicker.tsx:109-117`

O mesmo SVG (3 círculos + 2 linhas) está inline em dois componentes.

**Sugestão:** Extrair para um componente `<ShareIcon />` ou usar o sprite `icons.svg` (que já existe mas está sem uso).

---

### 3.5 Widgets `embed.ts` e `web-component.ts` — 90% duplicados

**Arquivos:**
- `src/widgets/embed.ts` — 106 linhas
- `src/widgets/web-component.ts` — 106 linhas

O CSS, HTML, lógica de atualização do contador e estrutura são quase idênticos. A única diferença é o mecanismo de encapsulamento (DOM puro vs. Custom Element).

**Sugestão:** Extrair a lógica compartilhada para `src/widgets/shared.ts`:
- Renderização do HTML/CSS do widget
- Lógica de atualização do contador
- Configuração de estilos

---

### 3.6 `mortality-stats.json` — duplicação de dados com `mortality.ts`

**Arquivo:** `public/data/mortality-stats.json`

O JSON contém os mesmos dados de `CAUSE_BREAKDOWN` e métricas de `mortality.ts`. Se um for atualizado sem o outro, haverá inconsistência.

**Sugestão:** Se o JSON serve como API pública, gerá-lo automaticamente a partir de `mortality.ts` via script de build. Se não é consumido, removê-lo.

---

## 🧹 4. CÓDIGO/ASSETS MORTOS

### 4.1 `public/icons.svg` — sprite de ícones sem uso

**Arquivo:** `public/icons.svg` (5KB)

Contém símbolos para Bluesky, Discord, Documentation, GitHub, Social e X. Nenhum é referenciado no código. O projeto usa SVGs inline.

**Sugestão:** Remover ou migrar os ícones para uso via `<use href="/icons.svg#icon-name">`.

---

### 4.2 `public/images/widget-dark.png`, `widget-embed.png`, `widget-light.png`

**Arquivos:** `public/images/` — 3 imagens

Nenhum componente ou documento referencia esses arquivos. Provavelmente são screenshots de documentação.

**Sugestão:** Mover para `docs/images/` ou remover se não são necessários.

---

### 4.3 `public/og-image.png` — 792KB, redundante

**Arquivo:** `public/og-image.png` (792KB)

O `index.html` referencia apenas `og-image.jpg` (136KB). O PNG é 5.8× maior e não é usado.

**Sugestão:** Remover `og-image.png`.

---

### 4.4 `src/assets/hero.png` e `src/assets/vite.svg` — assets padrão Vite

**Arquivos:** `src/assets/hero.png`, `src/assets/vite.svg`

Nenhum componente importa esses arquivos. São remanescentes do scaffolding Vite.

**Sugestão:** Remover.

---

### 4.5 `index.css` — classes `.noise-overlay` e `.counter-glow` sem uso

**Arquivo:** `src/index.css:30-33`

- `.noise-overlay` — definida mas nunca usada. O ruído é aplicado inline em `App.tsx`.
- `.counter-glow` — definida mas nunca usada. O código usa `counter-glow-active` (via Tailwind animation).

**Sugestão:** Remover `.noise-overlay` e `.counter-glow`.

---

### 4.6 `tailwind.config.js` — animações `fade-in` e `pulse-slow` sem uso

**Arquivo:** `tailwind.config.js:38-39`

As classes `animate-fade-in` e `animate-pulse-slow` são definidas mas não usadas em nenhum componente.

**Sugestão:** Remover do config.

---

### 4.7 `vite.widgets.config.ts` — propriedade `name` desnecessária

**Arquivo:** `vite.widgets.config.ts:9`

```ts
name: 'VidasMasculinasWidgets',
```

O `name` só é relevante para formatos UMD/IIFE. O formato `es` não gera wrapper nomeado.

**Sugestão:** Remover `name`.

---

## 🏗️ 5. QUALIDADE DE CÓDIGO

### 5.1 `CauseTicker` — `nextSlide`/`prevSlide` não são memoizadas e faltam no `useEffect`

**Arquivo:** `src/components/CauseTicker.tsx:27-33`

```ts
const nextSlide = () => { ... };
const prevSlide = () => { ... };

useEffect(() => {
  if (isPaused) return;
  timerRef.current = setTimeout(() => { nextSlide(); }, AUTO_SLIDE_MS);
  return () => { ... };
}, [currentIndex, isPaused]); // ❌ nextSlide não está no deps
```

**Problemas:**
1. `nextSlide` não está no array de dependências do `useEffect` — violação das regras de hooks
2. `nextSlide` e `prevSlide` não são `useCallback`, então são recriadas a cada render

**Sugestão:** Envolver em `useCallback` e adicionar ao array de dependências.

---

### 5.2 `CauseTicker` — pausa por hover não funciona em touch

**Arquivo:** `src/components/CauseTicker.tsx:41-42`

```tsx
onMouseEnter={() => setIsPaused(true)}
onMouseLeave={() => setIsPaused(false)}
```

Em dispositivos touch, não há `mouseenter`/`mouseleave`. O carrossel nunca pausa em mobile.

**Sugestão:** Adicionar `onTouchStart={() => setIsPaused(true)}` e `onTouchEnd={() => setIsPaused(false)}`.

---

### 5.3 `ThemeToggle` — preferência não persiste

**Arquivo:** `src/components/ThemeToggle.tsx`

O estado do tema é mantido apenas em React state. Ao recarregar a página, o tema volta ao padrão (`dark` via classe no HTML).

**Sugestão:** Persistir em `localStorage` e ler no `useEffect` de inicialização.

---

### 5.4 `useCounter` — `firstVisitTime` como `useState` em vez de `useRef`

**Arquivo:** `src/hooks/useCounter.ts:31-40`

`firstVisitTime` nunca muda após a inicialização. Usar `useState` adiciona overhead desnecessário de state management.

**Sugestão:** Usar `useRef` ou `useMemo` para valores inicializados uma vez.

---

### 5.5 `useCounter` — `start()` é chamado via `useEffect` no `App.tsx`

**Arquivo:** `src/App.tsx:16-18`

```ts
const { deaths, sessionDeaths, sessionSeconds, isRunning, start } = useCounter();
useEffect(() => { start(); }, [start]);
```

O counter poderia auto-iniciar dentro do hook, eliminando a necessidade de `start()` ser exposto e chamado manualmente.

**Sugestão:** Auto-iniciar o `requestAnimationFrame` dentro do hook.

---

### 5.6 `IntersectionObserver` inline no `App.tsx`

**Arquivo:** `src/App.tsx:18-34`

A lógica de scroll reveal está inline em `App.tsx`. É um efeito genérico que poderia ser reutilizado.

**Sugestão:** Extrair para `src/hooks/useScrollReveal.ts`.

---

### 5.7 `HangingBulb` — componente de 50+ linhas dentro de `Hero.tsx`

**Arquivo:** `src/components/Hero.tsx:60-112`

O componente `HangingBulb` é definido no mesmo arquivo que `Hero`. `Hero.tsx` já tem 359 linhas.

**Sugestão:** Extrair para `src/components/HangingBulb.tsx`.

---

### 5.8 `SHARE_COPY` e `COUNTER_PHRASES` em `Hero.tsx`

**Arquivo:** `src/components/Hero.tsx:14-49`

Arrays de constantes de texto definidos no arquivo do componente. O `Hero.tsx` tem muita lógica de apresentação.

**Sugestão:** Mover para `src/constants/copy.ts` ou `src/data/phrases.ts`.

---

### 5.9 `formatSessionTime` em `Hero.tsx`

**Arquivo:** `src/components/Hero.tsx:57-64`

Função utilitária que não depende de estado do componente.

**Sugestão:** Mover para `src/utils/format.ts`.

---

### 5.10 `DataFooter.tsx` — `duration-250` não é classe Tailwind válida

**Arquivo:** `src/components/DataFooter.tsx:73,87`

`transition-colors duration-250` — a classe `duration-250` não existe no Tailwind por padrão (os valores são 75, 100, 150, 200, 300, 500, 700, 1000).

**Sugestão:** Usar `duration-200` ou `duration-300`, ou adicionar `duration-250` ao `tailwind.config.js`.

---

### 5.11 `scripts/simulate-ui.js` — usa CommonJS em projeto ESM

**Arquivo:** `scripts/simulate-ui.js:1`

```js
const { chromium } = require('playwright');
```

O projeto usa `"type": "module"` no `package.json`, mas o script usa `require()`.

**Sugestão:** Converter para ESM (`import { chromium } from 'playwright'`) e renomear para `.mjs` ou adicionar ao `.gitignore` se for temporário.

---

## 🌐 6. INCONSISTÊNCIAS DE INFRAESTRUTURA

### 6.1 `robots.txt` e `sitemap.xml` apontam para `netlify.app`

**Arquivos:**
- `public/robots.txt:4` — `Sitemap: https://vidasmasculinas.netlify.app/sitemap.xml`
- `public/sitemap.xml:4` — `<loc>https://vidasmasculinas.netlify.app/</loc>`

Todo o resto do projeto (meta tags, StoryCard, widgets) usa `vidasmasculinas.vercel.app`.

**Sugestão:** Unificar o domínio. Se o Vercel é o primário, atualizar `robots.txt` e `sitemap.xml`.

---

### 6.2 Dual hosting: Netlify + Vercel

**Arquivos:** `netlify.toml`, `vercel.json`

Ambos os arquivos de configuração existem com headers e rewrites semelhantes. A edge function do Netlify (`og-injector.ts`) é a única funcionalidade que o Vercel não replica.

**Sugestão:** Se o Vercel é o host primário, implementar a lógica do `og-injector` como middleware do Vercel e remover `netlify.toml`. Se ambos são necessários, documentar o motivo.

---

### 6.3 `index.html` — favicon referencia `/vite.svg` em vez de `/favicon.svg`

**Arquivo:** `index.html:65`

```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

Existe um `public/favicon.svg` mas o HTML referencia o favicon padrão do Vite.

**Sugestão:** Trocar para `/favicon.svg`.

---

## 📊 7. RESUMO PRIORIZADO

| # | Categoria | Problema | Severidade | Esforço |
|---|-----------|----------|------------|---------|
| 1.1 | Bug | Regex Twitter no og-injector | 🔴 Alto | Baixo |
| 1.2 | Bug | Ano hardcoded "2026" | 🔴 Alto | Baixo |
| 1.3 | Bug | `relative` faltando em MethodologySection | 🟡 Médio | Baixo |
| 2.1 | Perf | 12.5 re-renders/s desnecessários | 🟡 Médio | Médio |
| 2.2 | Perf | 3 timers para yearSeconds | 🟡 Médio | Médio |
| 2.3 | Perf | gsap para 1 animação | 🟡 Médio | Médio |
| 2.4 | Perf | @import Google Fonts | 🟡 Médio | Baixo |
| 2.5 | Perf | fetch(dataUrl) → Blob | 🟢 Baixo | Baixo |
| 3.1 | DRY | EPOCH_LABEL duplicado | 🟡 Médio | Baixo |
| 3.2 | DRY | DEATHS_PER_DAY duplicado | 🟡 Médio | Baixo |
| 3.3 | DRY | .replace('.', ',') ×16 | 🟡 Médio | Baixo |
| 3.4 | DRY | SVG share icon duplicado | 🟢 Baixo | Baixo |
| 3.5 | DRY | Widgets 90% duplicados | 🟡 Médio | Médio |
| 3.6 | DRY | JSON duplica mortality.ts | 🟡 Médio | Médio |
| 4.1 | Morto | icons.svg sem uso | 🟢 Baixo | Baixo |
| 4.2 | Morto | 3 imagens widget sem uso | 🟢 Baixo | Baixo |
| 4.3 | Morto | og-image.png 792KB | 🟡 Médio | Baixo |
| 4.4 | Morto | assets hero.png, vite.svg | 🟢 Baixo | Baixo |
| 4.5 | Morto | CSS .noise-overlay, .counter-glow | 🟢 Baixo | Baixo |
| 4.6 | Morto | Tailwind fade-in, pulse-slow | 🟢 Baixo | Baixo |
| 4.7 | Morto | name no vite.widgets.config | 🟢 Baixo | Baixo |
| 5.1 | Qualidade | Hooks deps faltando em CauseTicker | 🟡 Médio | Baixo |
| 5.2 | Qualidade | Hover não funciona em touch | 🟡 Médio | Baixo |
| 5.3 | Qualidade | Tema não persiste | 🟢 Baixo | Baixo |
| 5.4 | Qualidade | useState vs useRef/useMemo | 🟢 Baixo | Baixo |
| 5.5 | Qualidade | start() manual no App | 🟢 Baixo | Baixo |
| 5.6 | Qualidade | IntersectionObserver inline | 🟢 Baixo | Baixo |
| 5.7 | Qualidade | HangingBulb dentro de Hero | 🟢 Baixo | Baixo |
| 5.8 | Qualidade | Constantes em Hero.tsx | 🟢 Baixo | Baixo |
| 5.9 | Qualidade | formatSessionTime em Hero | 🟢 Baixo | Baixo |
| 5.10 | Qualidade | duration-250 inválido | 🟢 Baixo | Baixo |
| 5.11 | Qualidade | CJS em projeto ESM | 🟢 Baixo | Baixo |
| 6.1 | Infra | Domínio netlify vs vercel | 🟡 Médio | Baixo |
| 6.2 | Infra | Dual hosting config | 🟡 Médio | Médio |
| 6.3 | Infra | Favicon vite.svg vs favicon.svg | 🟢 Baixo | Baixo |

---

## 📋 8. PLANO DE AÇÃO SUGERIDO

### Fase 1 — Correções rápidas (1-2h)
- [ ] Corrigir regex do Twitter no `og-injector.ts` (1.1)
- [ ] Trocar ano hardcoded "2026" por `new Date().getFullYear()` (1.2)
- [ ] Adicionar `relative` ao `MethodologySection` (1.3)
- [ ] Trocar `duration-250` por `duration-200` (5.10)
- [ ] Trocar favicon `/vite.svg` → `/favicon.svg` (6.3)
- [ ] Unificar domínio em `robots.txt` e `sitemap.xml` (6.1)

### Fase 2 — Limpeza de assets mortos (30min)
- [ ] Remover `public/icons.svg` (4.1)
- [ ] Remover `public/og-image.png` (4.3)
- [ ] Remover `src/assets/hero.png` e `src/assets/vite.svg` (4.4)
- [ ] Mover ou remover `public/images/widget-*.png` (4.2)
- [ ] Remover `.noise-overlay` e `.counter-glow` do CSS (4.5)
- [ ] Remover animações `fade-in` e `pulse-slow` do Tailwind (4.6)

### Fase 3 — DRY e extração (2-3h)
- [ ] Exportar `DEATHS_PER_DAY` e `EPOCH_LABEL` de `mortality.ts` (3.1, 3.2)
- [ ] Criar `formatDecimal()` em `mortality.ts` (3.3)
- [ ] Extrair SVG share icon para componente (3.4)
- [ ] Extrair lógica compartilhada dos widgets (3.5)
- [ ] Extrair `HangingBulb`, `SHARE_COPY`, `COUNTER_PHRASES`, `formatSessionTime` de `Hero.tsx` (5.7-5.9)
- [ ] Extrair `useScrollReveal` hook (5.6)

### Fase 4 — Performance (2-3h)
- [ ] Reduzir `TICK_MS` ou usar ref-based updates (2.1)
- [ ] Centralizar `yearSeconds` no `useCounter` (2.2)
- [ ] Substituir `gsap` por CSS transitions (2.3)
- [ ] Mover Google Fonts para `<link>` no HTML (2.4)
- [ ] Otimizar data URL → Blob (2.5)

### Fase 5 — Qualidade e robustez (1-2h)
- [ ] Corrigir deps do `useEffect` em `CauseTicker` (5.1)
- [ ] Adicionar suporte touch ao pause do carrossel (5.2)
- [ ] Persistir tema em `localStorage` (5.3)
- [ ] Auto-iniciar o `useCounter` (5.4, 5.5)
- [ ] Converter `simulate-ui.js` para ESM (5.11)
