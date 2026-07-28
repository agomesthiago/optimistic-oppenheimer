# 🎯 Plano Revisado de Limpeza — Essência vs. Desperdício

> O projeto **Vidas Masculinas** é um memorial visual. Compartilhar o status com números é a funcionalidade principal. A lâmpada pendurada dá o tom emocional. Ambos são **essência**, não vibecoding.

---

## 🔴 IDENTIDADE — MANTER E OTIMIZAR (nunca remover)

### I1. Compartilhar / StoryCards

**Funcionalidade:** O botão de share captura um card 1080×1920 com os números atuais e exporta como PNG para stories/download. É o propósito principal do site — levar os dados para fora.

**Componentes envolvidos:**
- `StoryCard.tsx` (117 linhas) — card do contador principal
- `CauseStoryCard.tsx` (102 linhas) — card por causa específica
- `useShare.ts` (55 linhas) — hook de captura + Web Share API
- `CauseTicker.tsx:98` — botão de share por causa
- `Hero.tsx:324` — botão de share principal

**Status atual:** ✅ Funcional. `html-to-image` é importado dinamicamente (lazy), pixelRatio=1, dimensões fixas.

**O que otimizar (sem remover funcionalidade):**
- StoryCards estão renderizados permanentemente no DOM. Podem ser **renderizados sob demanda** — só quando o usuário clica em "Compartilhar". Isso elimina 4 megapixels de layout permanente. A lógica: o botão chama `shareToStories()` → o hook primeiro renderiza o card via portal/estado → depois captura → depois remove. A renderização é instantânea (~16ms) e não afeta a UX.
- `fetch(dataUrl)` → Blob pode ser substituído por `dataUrlToBlob()` sem rede, mas é micro-otimização.

---

### I2. Lâmpada Pendurada (HangingBulb)

**Funcionalidade:** Dá o tom emocional do projeto — uma lâmpada pendurada que balança, com filamento piscando. No dark mode, é o elemento visual mais marcante. É **brand**, não decoração.

**Componentes envolvidos:**
- `Hero.tsx:60-112` — ~52 linhas de JSX
- `index.css:60-113` — 3 keyframes + 2 classes (flicker-glow, flicker-filament, swing/pendulum)
- Estado `didTick` — halo pulsa quando uma morte é registrada

**Status atual:** ✅ Funcional e emocionalmente eficaz.

**O que otimizar (sem remover a lâmpada):**
- O halo de glow é 900×900px. Reduzir para **400×400px** mantém o mesmo efeito visual (é blur(30px) — tudo vira gradient suave, tamanho é indistinguível). Isso reduz a área de composição GPU de 810k pixels → 160k pixels (~80% menos).
- `didTick` com `scale(1.12)` no halo — manter o efeito de pulsação, mas trocar `scale(1.12)` por `opacity: 0.9 → 1` (evita repaint de 900→1008px). Mesmo impacto visual, menos GPU.
- A lâmpada é `hidden dark:block` — ela já só renderiza no dark mode. Bom.

---

### I3. Números / Contador / Estatísticas

**Funcionalidade:** Todo o conteúdo numérico do site é a razão de existir. Contador em tempo real, estatísticas anuais, expectativa de vida, suicídios, breakdown por causa.

**O que otimizar (sem alterar dados):**
- `.replace('.', ',')` ×16 → criar `formatDecimal()` (DRY, não remove nada)
- `DEATHS_PER_DAY` ×3 → exportar de `mortality.ts` (DRY)
- `EPOCH_LABEL` ×2 → exportar de `mortality.ts` (DRY)

---

## 🟡 DESPERDÍCIO — GENUINELY INÚTIL (remover)

### D1. Noise Overlay (opacity 0.02)

**O que é:** SVG fractalNoise cobrindo tela inteira com 2% de opacidade.

**Por que é inútil:** 0.02 = 98% transparente. O olho humano não distingue isso de fundo sólido. Serve como "textura sutil" que ninguém percebe.

**Ação:** Remover completamente — o `div` inline em `App.tsx:44-53` e a classe `.noise-overlay` em `index.css:55-58`. Se a lâmpada já dá textura visual ao dark mode, o noise é redundante.

**Impacto visual:** Zero. Ninguém vai notar.

---

### D2. Page Indicators (.01, .02, .03...)

**O que é:** 8 blocos idênticos no canto inferior esquerdo mostrando ".01", ".02" etc.

**Por que é inútil:** Numeração de páginas num site scrollável. Não é clicável, não navega, não é referenciado em nenhum lugar. Imita design editorial impresso sem propósito digital.

**Ação:** Remover todos 8 blocos. Se houver demanda futura para navegação por seção, implementar sidebar ou progress bar funcional.

**Impacto visual:** Negativo? Quase zero — são 10px font-mono em slate-400/ash-600.

---

### D3. Blink-Random no Botão de Share

**O que é:** 15 linhas de keyframe que fazem o botão piscar com borda vermelha em momentos "aleatórios".

**Por que é inútil:** A animação é 0.6s de duração em 8s de ciclo — 7.5% do tempo visível, e o "aleatório" é hardcoded. Distrativo e inconsistente com o tom solene do projeto.

**Ação:** Remover `@keyframes blink-random` e `.animate-blink-random` do CSS. Remover `animate-blink-random` da classe do botão no `Hero.tsx`. O botão já tem hover state — é suficiente.

**Impacto visual:** O botão fica mais estável e respeitoso com o tema. Melhor.

---

### D4. GSAP (30KB para 1 animação)

**O que é:** Biblioteca importada para animar `y:20→0, opacity:0→1, blur:8→0` quando o modo muda.

**Por que é inútil:** ~30KB gzipped para uma única animação de 0.6s que pode ser CSS.

**Ação:** Remover importação do `gsap` e o `useEffect` + `textContainerRef` associado. Substituir por CSS transition no `span` do contador:

```
transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), 
            opacity 0.6s ease-out, 
            filter 0.6s ease-out;
```

Trigger via classe condicional (`mode-transition`) que se aplica quando o modo muda, e remove após 600ms.

**Impacto visual:** Idêntico. `back.out(1.5)` ≈ `cubic-bezier(0.34, 1.56, 0.64, 1)`.

**Impacto bundle:** -30KB gzipped.

---

### D5. Scroll Reveal — blur(5px) + scale(0.985)

**O que é:** Seções entram com `opacity:0, translateY(36px), scale(0.985), blur(5px)`.

**Por que scale(0.985) é inútil:** 1.5% de escala. Imperceptível. Adiciona transform layer sem ganho visual.

**Por que blur(5px) é inútil:** Animação de blur é a operação CSS mais cara. Em 8 seções, cada uma com `will-change: opacity, transform, filter` = 24 GPU layers permanentes.

**Ação:** Manter `opacity + translateY(36px)` (essencial para entrada suave). Remover `scale(0.985)`, `filter: blur(5px)`, e `will-change`. Resultado:

```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Impacto visual:** Entrada suave preservada. Perda imperceptível (blur 5px→0 e scale 1.5%→0%).

**Impacto performance:** -24 GPU layers permanentes. -8 blur animações.

---

### D6. Counter Glow Pulsante (animado)

**O que é:** `text-shadow` vermelho que pulsa via `glowPulse` keyframe. Definido em 2 lugares (CSS + Tailwind config).

**Ação:** Manter o `text-shadow` estático (vermelho fixo = parte do tom). Remover a animação `glowPulse` — tanto do CSS quanto do Tailwind config. Remover `.counter-glow-active` e a animação.

**Por que:** O glow estático já comunica o tom. A pulsação é sutil demais para valer a animação constante. O dark:counter-glow-active vira dark:counter-glow (estático).

**Impacto visual:** Glow vermelho permanente no contador dark mode. Sem pulsação. Aceitável.

---

### D7. Scroll Indicator Animado

**O que é:** Linha animada infinitamente + "Scroll" em vertical.

**Ação:** Simplificar para um chevron estático ou arrow ↓ sem animação. A animação infinita não respeita `prefers-reduced-motion` e nunca para.

---

### D8. Hover Effects em Cards Não-Interativos

**O que é:** `hover:scale-105`, `hover:-translate-y-1`, `hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)]` em cards de estatística e contexto que não são clicáveis.

**Ação:** Remover `hover:scale-105`, `hover:-translate-y-1`, e as shadows customizadas. Trocar `transition-all` por `transition-colors`. Manter `group-hover:text-crimson` (mudança de cor é feedback suficiente e relevante — indica qual estatística o mouse está sobre).

**Por que:** Scale/translate/shadow em elementos `cursor-default` confunde o usuário — sugere que é clicável mas não é. A mudança de cor para crimson é suficiente e informativa.

---

## 🔵 BUGS — CORRIGIR (do scan anterior)

| # | Bug | Ação |
|---|-----|------|
| B1 | Regex Twitter no `og-injector.ts` (`property` vs `name`) | Trocar `property="twitter"` → `name="twitter"` nos regexes |
| B2 | Ano "2026" hardcoded em `CauseTicker` e `StoryCard` | Usar `new Date().getFullYear()` dinamicamente |
| B3 | `MethodologySection` sem `relative` | Adicionar classe `relative` |
| B4 | Favicon `/vite.svg` → `/favicon.svg` | Corrigir no `index.html` |
| B5 | Domínio `netlify.app` em `robots.txt` e `sitemap.xml` | Unificar para `vercel.app` |
| B6 | `duration-250` classe inválida | Trocar para `duration-200` |

---

## 🟢 ASSETS MORTOS — REMOVER

| # | Asset | Razão |
|---|-------|-------|
| A1 | `public/icons.svg` | Sprite sem uso — SVGs são inline |
| A2 | `public/og-image.png` (792KB) | Não referenciado; `og-image.jpg` é usado |
| A3 | `src/assets/hero.png`, `src/assets/vite.svg` | Scaffolding Vite, nunca importado |
| A4 | `public/images/widget-*.png` (3 imgs) | Não referenciado em nenhum lugar |
| A5 | `.noise-overlay` no CSS | Duplicata da inline (que será removida também) |
| A6 | `.counter-glow` (sem `-active`) no CSS | Nunca usada |
| A7 | `glowPulse` keyframe no Tailwind config | Duplicata do CSS (ambos serão removidos) |
| A8 | `fade-in` e `pulse-slow` no Tailwind | Nunca usados |
| A9 | `name` no `vite.widgets.config.ts` | Irrelevante para formato ES |

---

## 📐 DRY — CONSOLIDAR (sem alterar funcionalidade)

| # | Padrão | Ocorrências | Ação |
|---|--------|-------------|------|
| R1 | `EPOCH_LABEL` duplicado | Hero + StoryCard | Exportar de `mortality.ts` |
| R2 | `DEATHS_PER_DAY` duplicado | Stats + Context + Methodology | Exportar de `mortality.ts` |
| R3 | `.replace('.', ',')` | 16x | Criar `formatDecimal()` em `mortality.ts` |
| R4 | Page indicator block | 8x cópias | **Remover** (D2) |
| R5 | SVG share icon inline | Hero + CauseTicker | Extrair componente `<ShareIcon />` |
| R6 | Widget CSS/HTML | embed.ts + web-component.ts | Extrair `shared.ts` |

---

## 📊 PLANO DE EXECUÇÃO — ORDEM DE PRIORIDADE

### Fase 1 — Bugs + Assets Mortos (30min, zero risco visual)
1. B1 → B6 — corrigir todos os bugs listados
2. A1 → A9 — remover todos os assets mortos

### Fase 2 — Desperdício Visível (1h, melhora performance)
3. D1 — Remover noise overlay (App.tsx + CSS)
4. D2 — Remover todos 8 page indicators
5. D3 — Remover blink-random (CSS + Hero.tsx)
6. D5 — Simplificar scroll reveal (remover blur/scale/will-change)
7. D6 — Remover counter glow animation (manter glow estático)
8. D7 — Simplificar scroll indicator (remover animação infinita)
8. D8 — Remover hover scale/translate/shadow em cards não-clicáveis

### Fase 3 — Bundle + Performance (1-2h)
9. D4 — Remover gsap → CSS transition
10. StoryCards → renderizar sob demanda (portal condicional)

### Fase 4 — DRY + Qualidade (1-2h)
11. R1 → R6 — consolidar duplicações
12. Otimizar halo da lâmpada (900→400px, scale→opacity)
13. `CauseTicker` — memoizar `nextSlide`/`prevSlide`, corrigir deps
14. `CauseTicker` — adicionar touch pause
15. `ThemeToggle` — persistir em localStorage
16. `mortality-stats.json` — decidir se é API ou remover

### Fase 5 — CSS/Infra Final (30min)
17. Mover Google Fonts para `<link>` no HTML
18. Unificar infra Netlify/Vercel
19. `simulate-ui.js` → ESM
20. `firstVisitTime` → useRef no `useCounter`

---

## 📈 RESULTADO ESTIMADO

| Metric | Antes | Depois |
|--------|-------|--------|
| Bundle JS (gzipped) | ~30KB gsap + resto | ~30KB menos |
| GPU layers permanentes | 24+ (will-change × 8 seções) | 0 (sem will-change) |
| DOM permanente invisível | 4 megapixels (StoryCards) | 0 (render sob demanda) |
| Animações infinitas | 3 (pendulum, scroll-line, glow-pulse) | 1 (pendulum — essencial) |
| Linhas de CSS inútil | ~40 (noise, blink, glow, unused) | ~0 |
| Linhas de JSX inútil | ~30 (page indicators, blink class) | ~0 |
| Assets mortos no public/ | ~1MB (og-image.png + icons + imgs) | 0 |
| Tailwind config morto | 2 keyframes + 1 name | 0 |

**Identidade preservada 100%:**
- ✅ Lâmpada pendurada + filamento + halo (otimizado, não removido)
- ✅ Compartilhar / StoryCards (otimizado para sob demanda, não removido)
- ✅ Contador glow estático (animado removido, visual mantido)
- ✅ Todos os números e estatísticas
- ✅ Scroll reveal suave (opacity + translateY preservados)
- ✅ DidTick + animate-count-up no contador (feedback de morte mantido)
- ✅ Frases de copy rotativo (mantidas — podem simplificar depois)
