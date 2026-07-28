# 🎭 Varredura de Vibecoding — Código que Existe Só por Estética

> **Vibecoding** = código cujo único propósito é parecer "cool" ou sofisticado, sem contribuir funcionalmente para o usuário. Efeitos que ninguém percebe, animações que adicionam peso, padrões que complicam sem razão.

---

## 🏆 TOP 1 — O Lusteriro de Lâmpada (HangingBulb)

**Arquivo:** `src/components/Hero.tsx:60-112` + `src/index.css:60-113`

**O que é:** Um SVG de uma lâmpada pendurada que balança como pêndulo, com filamento que pisca, e um halo de luz de **900×900px** com blur de 30px atrás dela.

**O que custa:**
- ~50 linhas de componente JSX
- 3 keyframes CSS (`flicker-glow`, `flicker-filament`, `swing`)
- 2 classes CSS especiais (`.filament-glow`, `.animate-pendulum`)
- Um `div` de **900×900px** com `filter: blur(30px)` renderizado a cada frame
- Estado `didTick` + `useEffect` + `setTimeout` para fazer o halo "pulsar" a cada morte
- O `transform: scale(1.12)` no halo quando uma morte acontece — **1.12× em 900px = 1008px** — para um efeito que ninguém vê

**O que entrega:** A lâmpada só aparece no dark mode (`hidden dark:block`), balança infinitamente, e tem um brilho que pulsa. O usuário médio nunca nota que é uma lâmpada — parece uma mancha de luz.

**Veredito:** 🗑️ Vibecoding puro. É um "lusteriro" decorativo que consome GPU, código e estado React para zero funcionalidade.

---

## 🏆 TOP 2 — Noise Overlay (Textura de Ruído Invisível)

**Arquivo:** `src/App.tsx:44-53` + `src/index.css:55-58`

**O que é:** Um SVG de `fractalNoise` (300×300px) que cobre toda a tela com `opacity: 0.02` (light mode) ou `0.04` (dark mode).

**O problema:** 
- **0.02 de opacidade** = 98% transparente. O olho humano mal distingue isso de um fundo sólido.
- Existe **duas versões** — uma inline no `App.tsx` e outra como classe `.noise-overlay` no CSS — e **nenhuma das duas é a mesma**: a inline usa `baseFrequency='0.75'` e a classe usa `baseFrequency='0.9'`. Vibecoding duplicado e inconsistente.
- O `fractalNoise` com `numOctaves='4'` é computacionalmente caro para o browser renderizar em um overlay full-screen.

**Veredito:** 🗑️ Efeito imperceptível que consome GPU. Remover.

---

## 🏆 TOP 3 — Botão de Share com "Blink Aleatório"

**Arquivo:** `src/index.css:117-131` + `src/components/Hero.tsx:326`

**O que é:** Uma animação CSS de 8 segundos que faz o botão de compartilhar "piscar" com borda vermelha e box-shadow em momentos "aleatórios":

```css
@keyframes blink-random {
  0%, 100% { opacity: 1; border-color: inherit; box-shadow: none; }
  4% { opacity: 0.6; border-color: #ef4444; box-shadow: 0 0 12px rgba(239,68,68,0.3); }
  5% { opacity: 1; border-color: inherit; box-shadow: none; }
  35% { opacity: 1; border-color: inherit; box-shadow: none; }
  36% { opacity: 0.5; border-color: #ef4444; box-shadow: 0 0 16px rgba(239,68,68,0.4); }
  37.5% { opacity: 0.9; border-color: #dc2626; box-shadow: 0 0 8px rgba(220,38,38,0.2); }
  38.5% { opacity: 1; border-color: inherit; box-shadow: none; }
  70% { opacity: 1; border-color: inherit; box-shadow: none; }
  71% { opacity: 0.7; border-color: #ef4444; box-shadow: 0 0 14px rgba(239,68,68,0.35); }
  72% { opacity: 1; border-color: inherit; box-shadow: none; }
}
```

**O problema:**
- 15 linhas de CSS para simular "aleatoriedade" — que não é aleatória, é sempre o mesmo padrão
- O efeito é tão sutil (0.6s de duração total em 8s de ciclo) que ninguém percebe
- `box-shadow` animado causa re-paint a cada frame
- O comentário no CSS diz "Random colored blink" — mas não é random, é hardcoded

**Veredito:** 🗑️ Vibecoding que engana a si mesmo. Substituir por um simples `hover:ring-2 hover:ring-red-500/30` ou remover.

---

## 🏆 TOP 4 — Page Indicators (.01, .02, .03...)

**Arquivos:** 8 seções — `Hero.tsx`, `StatsSection.tsx`, `LifeExpectancySection.tsx`, `SuicideSection.tsx`, `App.tsx`, `ContextSection.tsx`, `ResourcesSection.tsx`, `MethodologySection.tsx`

**O que é:** Um indicador de "página" no canto inferior esquerdo de cada seção:

```tsx
<div className="absolute bottom-8 left-8 z-20 flex flex-col items-start gap-1 
  text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-ash-600 
  text-left select-none">
  <span className="text-sm font-bold text-slate-600 dark:text-ash-400">.01</span>
</div>
```

**O problema:**
- **8 cópias** do mesmo bloco de HTML (cada uma com ~3 linhas de className)
- Não é clicável, não navega, não é um índice — é um número decorativo
- Os números (.01, .02, .03...) não correspondem a nenhuma numeração real de páginas
- O `MethodologySection` nem tem `relative` no pai, então o indicador flutua para fora
- Em mobile, o `bottom-8 left-8` pode sobrepor conteúdo

**Veredito:** 🗑️ Vibecoding que imita design editorial impresso. Em uma página web scrollável, não serve a propósito. Remover todos os 8.

---

## 🏆 TOP 5 — GSAP para Uma Animação de 0.6s

**Arquivo:** `src/components/Hero.tsx:155-160`

**O que é:**
```tsx
gsap.fromTo(
  textContainerRef.current,
  { y: 20, opacity: 0, filter: 'blur(8px)' },
  { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(1.5)' }
);
```

**O problema:**
- `gsap` inteiro importado (~30KB gzipped) para uma única animação
- `back.out(1.5)` — easing que "vai além e volta" — é imperceptível em 0.6s com blur
- O `filter: blur(8px)` animado via JS é mais caro que via CSS
- Tudo isso poderia ser uma CSS transition de 3 linhas

**Veredito:** 🗑️ Biblioteca pesada para efeito mínimo. Remover gsap e usar CSS.

---

## 🏆 TOP 6 — Scroll Reveal com Blur + Scale + Will-Change

**Arquivo:** `src/index.css:133-149`

**O que é:**
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(36px) scale(0.985);
  filter: blur(5px);
  will-change: opacity, transform, filter;
  transition: opacity 0.85s ..., transform 0.85s ..., filter 0.85s ...;
}
```

**O problema:**
- **`filter: blur(5px)`** animado = GPU-intensive. Cada seção blurra ao entrar na viewport
- **`scale(0.985)`** — 1.5% de escala. Literalmente imperceptível. Existe só para "dar vibe"
- **`will-change: opacity, transform, filter`** — coloca 3 propriedades em compositor layer permanente. São 8 seções × 3 layers = 24 layers de GPU mantidas para sempre
- **`blur(5px)` → `blur(0px)`** — animar blur é uma das operações mais caras em CSS

**Veredito:** 🗑️ O blur e o scale são 100% vibecoding. Simplificar para `opacity + translateY` (sem blur, sem scale, sem will-change).

---

## 🏆 TOP 7 — Counter Glow (Text-Shadow Pulsante)

**Arquivo:** `src/index.css:47-52` + `tailwind.config.js:40-44`

**O que é:** Um `text-shadow` vermelho que pulsa no contador principal:

```css
.counter-glow { text-shadow: 0 0 40px rgba(239, 68, 68, 0.3), 0 0 80px rgba(239, 68, 68, 0.1); }
.counter-glow-active { animation: glowPulse 2s ease-in-out infinite; }
```

```js
// tailwind.config.js — keyframe duplicada
glowPulse: {
  '0%, 100%': { textShadow: '0 0 20px rgba(239,68,68,0.3)' },
  '50%': { textShadow: '0 0 40px rgba(239,68,68,0.6), 0 0 80px rgba(239,68,68,0.2)' },
},
```

**O problema:**
- A mesma animação `glowPulse` está definida em **dois lugares** (CSS e Tailwind config)
- `.counter-glow` (sem `-active`) está definida mas **nunca usada** — só a versão `-active` é usada
- Animar `text-shadow` é caro (não é GPU-accelerated como `transform`/`opacity`)
- O efeito é um "brilho vermelho pulsante" que na prática parece um bug visual

**Veredito:** 🗑️ Glow pulsante é clássico vibecoding. Remover animação e usar `text-shadow` estático se necessário.

---

## 🏆 TOP 8 — "DidTick" Micro-Animação

**Arquivo:** `src/components/Hero.tsx:131, 165-172, 284`

**O que é:** Quando o contador de mortes incrementa um inteiro, ele faz uma micro-animação de 0.15s:

```tsx
const [didTick, setDidTick] = useState(false);

useEffect(() => {
  const current = Math.floor(deaths);
  if (current !== prevIntegerRef.current) {
    prevIntegerRef.current = current;
    if (mode === 'deaths') {
      setDidTick(true);
      const id = setTimeout(() => setDidTick(false), 150);
      return () => clearTimeout(id);
    }
  }
}, [deaths, mode]);

// No JSX:
className={`inline-block ${didTick && !isClockMode ? 'animate-count-up' : ''}`}
```

**O problema:**
- O contador muda a cada ~40 segundos. A animação dura 0.15s. Ou seja, **0.4% do tempo** o efeito está visível
- `animate-count-up` = `translateY(4px) + opacity: 0.6` → 4 pixels de deslocamento que ninguém percebe em um número que muda raramente
- Usa `useState` + `useEffect` + `setTimeout` + `useRef` para um efeito que ninguém vê
- O `didTick` também alimenta o `scale(1.12)` do halo de 900px da lâmpada (vibecoding em cima de vibecoding)

**Veredito:** 🗑️ Estado React + efeito para animação que ninguém percebe. Remover.

---

## 🏆 TOP 9 — Hover Effects em Cards de Estatística

**Arquivos:** `src/components/StatsSection.tsx:42`, `src/components/ContextSection.tsx:49`

**O que é:**
```tsx
// StatsSection — card escala 5% ao hover
hover:scale-105 cursor-default

// ContextSection — card sobe 4px + sombra customizada ao hover
hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
```

**O problema:**
- `cursor-default` + `hover:scale-105` — o cursor indica que não é clicável, mas a escala sugere que é
- `hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)]` — **0.02 de opacidade** = sombra literalmente invisível
- `transition-all` em vez de `transition-transform` — anima todas as propriedades em vez de só o que muda
- Cards que não são clicáveis nem interativos não deveriam ter hover effects

**Veredito:** 🗑️ Hover effects em elementos não-interativos. Remover ou simplificar.

---

## 🏆 TOP 10 — Scroll Indicator (Linha Animada)

**Arquivo:** `src/components/Hero.tsx:348-356` + `src/index.css:77-79, 112-113`

**O que é:** Uma linha vertical de 48px com uma barra animada que sobe e desce:

```tsx
<div className="w-px h-12 bg-zinc-200 dark:bg-carbon-800 relative overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-400 dark:bg-ash-500 animate-scroll-line" />
</div>
```

```css
@keyframes scroll-line {
  0% { transform: translateY(-100%); }
  80%, 100% { transform: translateY(100%); }
}
.animate-scroll-line { animation: scroll-line 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }
```

**O problema:**
- A animação roda infinitamente, mesmo que o usuário já tenha scrollado
- A palavra "Scroll" em `writing-mode: vertical-lr` — vibecoding tipográfico
- Não respeita `prefers-reduced-motion`
- O indicator continua animando mesmo quando a seção não está visível

**Veredito:** 🗑️ Decoração que nunca para. Simplificar para um simples chevron estático ou remover.

---

## 🏆 TOP 11 — StoryCards Renderizados Permanentemente

**Arquivos:** `src/components/StoryCard.tsx:53-56`, `src/components/CauseStoryCard.tsx:18-21`

**O que é:** Dois `div` de **1080×1920px** (2 megapixels cada) renderizados no DOM o tempo todo:

```tsx
<div
  className="fixed top-0 left-0 opacity-0 pointer-events-none -z-50 ..."
  style={{ width: '1080px', height: '1920px', ... }}
>
```

**O problema:**
- Estão sempre no DOM, mesmo que o usuário nunca clique em "Compartilhar"
- O `StoryCard` tem todo o conteúdo (título, subtítulo, branding, etc.) — custo de renderização
- O `CauseStoryCard` re-renderiza a cada tick do `CauseTicker` (muda o `count`)
- O browser precisa calcular layout para 2 elementos full-screen que ninguém vê
- Deveriam ser renderizados **sob demanda** (quando o usuário clica em compartilhar)

**Veredito:** 🗑️ Renderizar 2 megapixels invisíveis permanentemente. Renderizar sob demanda.

---

## 🏆 TOP 12 — 8 Frases de Copy Rotativo que Ninguém Lê

**Arquivo:** `src/components/Hero.tsx:13-49`

**O que é:**
- `SHARE_COPY` — 8 frases alternativas para o botão de compartilhar
- `COUNTER_PHRASES` — 5 funções JSX que geram frases melancólicas para o contador

```tsx
const shareCopy = useMemo(() => SHARE_COPY[Math.floor(Math.random() * SHARE_COPY.length)], []);
const phraseIndex = useMemo(() => Math.floor(Math.random() * COUNTER_PHRASES.length), []);
```

**O problema:**
- 35+ linhas de texto poético que rotaciona randomicamente — mas o usuário vê apenas **1** por sessão
- A frase muda entre refreshes, mas o usuário nunca vai comparar
- As frases do `COUNTER_PHRASES` são JSX functions com `React.ReactNode` — complexidade para gerar texto que poderia ser uma template string
- Vibecoding "literário" — o esforço de escrever 5 frases poéticas diferentes não tem retorno mensurável

**Veredito:** ⚠️ Não é lixo, mas é over-engineering. 1 frase bem escrita > 5 frases que ninguém vai comparar. Simplificar para 1 frase fixa.

---

## 🏆 TOP 13 — Radial Gradient Glow no StoryCard

**Arquivos:** `src/components/StoryCard.tsx:60-63`, `src/components/CauseStoryCard.tsx:31-33`

**O que é:**
```tsx
background: `radial-gradient(ellipse 70% 50% at 50% 40%, ${accentColor} 0%, transparent 80%)`,
```

**O problema:** Este gradiente só existe no card invisível (opacity 0) que é exportado como imagem. O `accentColor` é diferente para cada modo — mas o usuário nunca vê o card diretamente. A escolha de cor é irrelevantemente sofisticada para algo que vira PNG.

**Veredito:** ⚠️ Funcional mas over-engineered. Simplificar para um gradiente fixo.

---

## 📊 RESUMO — Impacto Cumulativo do Vibecoding

| Item | Código | GPU | Bundlesize | Estado React |
|------|--------|-----|------------|--------------|
| 1. HangingBulb | ~50 linhas + 3 keyframes + 2 classes | blur(30px) 900×900px + scale(1.12) | — | didTick + useEffect + setTimeout |
| 2. Noise Overlay | ~10 linhas + SVG inline | fractalNoise full-screen | — | — |
| 3. Blink Random | 15 linhas de keyframe | box-shadow animado | — | — |
| 4. Page Indicators | 8× ~3 linhas | — | — | — |
| 5. GSAP | ~6 linhas + ref | — | **~30KB gzipped** | useEffect + ref |
| 6. Scroll Reveal Blur | 5 linhas | blur(5px) × 8 seções + will-change × 24 layers | — | — |
| 7. Counter Glow | 2 definições duplicadas | text-shadow animado | — | — |
| 8. DidTick | ~12 linhas | — | — | useState + useEffect + useRef + setTimeout |
| 9. Hover Effects | inline | — | — | — |
| 10. Scroll Indicator | ~8 linhas + keyframe | animação infinita | — | — |
| 11. StoryCards | ~220 linhas | 2× 1080×1920px layout | — | re-render por tick |
| 12. Copy Rotativo | ~35 linhas | — | — | 2× useMemo |

**Total estimado de custo:**
- **~350+ linhas de código** que só servem para estética
- **~30KB** de bundle (gsap) para 1 animação
- **24+ GPU layers** permanentes (will-change)
- **2 animações infinitas** (pendulum + scroll-line) + 1 animação por tick (glow)
- **3 estados React** (didTick, didTick timeout, GSAP ref) para efeitos visuais
- **4 megapixels** de DOM invisível (StoryCards)

---

## ✅ PLANO DE LIMPEZA — Remover Vibecoding

### Ação Imediata (sem risco visual)
1. ✂️ Remover `.noise-overlay` do CSS (já tem versão inline no App.tsx)
2. ✂️ Remover `.counter-glow` do CSS (nunca usada, só a `-active`)
3. ✂️ Remover `glowPulse` duplicado do `tailwind.config.js` (já existe no CSS)
4. ✂️ Remover `fade-in` e `pulse-slow` do `tailwind.config.js` (nunca usados)
5. ✂️ Remover `duration-250` inválido do `DataFooter.tsx` → trocar por `duration-200`
6. ✂️ Remover `will-change` do `.reveal-on-scroll` (3 propriedades em 8 seções = 24 layers)

### Ação Recomendada (melhora performance)
7. ✂️ Remover `gsap` — substituir por CSS transition
8. ✂️ Remover `HangingBulb` inteiro (50 linhas + 3 keyframes + halo 900px)
9. ✂️ Remover `didTick` + `animate-count-up` (estado React para efeito invisível)
10. ✂️ Remover `blink-random` — substituir por hover ring simples
11. ✂️ Simplificar `.reveal-on-scroll` — remover `blur(5px)` e `scale(0.985)`
12. ✂️ Remover `counter-glow-active` — usar text-shadow estático
13. ✂️ Remover todos os 8 page indicators
14. ✂️ Remover scroll indicator animado — usar chevron estático
15. ✂️ StoryCards → renderizar sob demanda (só quando compartilhar)

### Ação Opcional (reduz complexidade)
16. ✂️ Simplificar `SHARE_COPY` para 1 frase fixa
17. ✂️ Simplificar `COUNTER_PHRASES` para 1 frase fixa
18. ✂️ Remover hover effects de cards não-interativos
19. ✂️ Remover noise overlay do `App.tsx` (opacidade 0.02 = imperceptível)
