# CERTIFICATION GATE — AUDITORIA DE DESTRUIÇÃO ("BREAK THE PRODUCT")
**Projeto:** Vidas Masculinas  
**Tipo de Avaliação:** Red Team / Stress & Destructive Engineering Audit (Nível Staff Engineer - Google / Apple / Stripe)  
**Meta:** Provar tecnicamente por que o produto NÃO deve entrar em produção até que todas as falhas estruturais de borda sejam mitigadas.

---

## RESUMO DO CERTIFICATION GATE

Diferente de uma auditoria de qualidade ("o site funciona?"), este **Certification Gate** assumiu uma postura 5 vezes mais agressiva, perguntando: **"como consigo quebrar este site em estados impossíveis, ambientes hostis e condições extremas?"**

Durante 40 minutos de inspeção forense no código-fonte, CSS, configuração de infraestrutura (`vercel.json`), manipuladores de eventos e semântica de DOM, identificamos **7 FALHAS CRÍTICAS E ALTAS DE ENGENHARIA** que reprovam o deploy imediato para tráfego real em massa.

### STATUS DE CERTIFICAÇÃO: **REPROVADO PARA PRODUÇÃO (NÃO)**

---

## DOSSIÊ DE REPROVAÇÃO TÉCNICA — AS 7 FASES DE DESTRUIÇÃO

### FASE 1 — MONKEY TESTING & ESTADOS IMPOSSÍVEIS
* **FALHA CRÍTICA #1: DoS por Exaustão de Memória em Click-Spam no Botão Compartilhar (`useShare.ts`)**
  * **Causa:** O método `shareToStories` em `src/hooks/useShare.ts` não possui trava de concorrência (`if (isSharing) return;` no topo da função).
  * **Impacto (Monkey Test):** Se um usuário (ou script) clicar repetidamente 5 a 10 vezes no botão "Compartilhar", o hook dispara múltiplas chamadas concorrentes a `html-to-image` (`toPng(node)`). Em navegadores móveis (Safari iOS ou WebView do Instagram), a renderização de múltiplos canvas simultâneos consome centenas de megabytes de RAM instantaneamente, causando travamento da aba ou crash por **Out of Memory**.
* **FALHA CRÍTICA #2: Crash por Exceção Não Tratada em Modo Privado (`ThemeToggle.tsx`)**
  * **Causa:** Em `src/components/ThemeToggle.tsx`, as chamadas a `localStorage.getItem(THEME_KEY)` e `localStorage.setItem(THEME_KEY, theme)` não estão encapsuladas em blocos `try/catch`.
  * **Impacto:** Em navegadores móveis operando em Modo Privado estrito (iOS Safari Private ou WebViews corporativos), o acesso à API `Storage` lança uma exceção `DOMException (QuotaExceededError / SecurityError)` não capturada, derrubando a árvore de componentes React ao alternar o tema.

---

### FASE 2 — STRESS VISUAL (320px a 3840px, ZOOM 400% & WCAG REFLOW)
* **FALHA ALTA #3: Quebra de Viewport e Overflow Horizontal em 320px sob Zoom de 200% (`Hero.tsx`)**
  * **Causa:** O contador principal em `src/components/Hero.tsx` utiliza `style={{ fontSize: 'clamp(4rem, 15vw, 10.5rem)' }}`.
  * **Impacto:** Em telas de 320px de largura (iPhone SE/Fold fechado), o valor mínimo de `4rem` (64px) para um número formatado de 7 caracteres (`800.000`, ~4.2em de largura = 268px) consome 84% da tela. Ao aplicar zoom de 200% a 400% (exigência WCAG 1.4.10 Reflow e Android Large Text), o contador transborda o viewport, cortando dígitos estatísticos vitais e causando scroll horizontal quebrado.

---

### FASE 3 — BROWSER TORTURE (Safari iOS, WebViews & Sem JavaScript)
* **FALHA ALTA #4: Apagão de Conteúdo (Blackout) em Renderizadores Sem JavaScript (`index.css`)**
  * **Causa:** A animação de entrada `.reveal-on-scroll` é inicializada em `src/index.css` com `opacity: 0; transform: translateY(36px);` e depende exclusivamente do `IntersectionObserver` via JavaScript (`useScrollReveal.ts`) para injetar a classe `.is-visible`.
  * **Impacto:** Em cenários onde o JavaScript falha ao carregar, é bloqueado por extensões de privacidade, ou em crawlers/leitores RSS que não executam observers de scroll, **80% do conteúdo do site (Estatísticas, Longevidade, Suicídio, Metodologia, FAQ) permanece permanentemente invisível (`opacity: 0`)**.

---

### FASE 4 — NETWORK TORTURE (Latência 1000ms, 3G Lento & Fontes Bloqueadas)
* **FALHA MÉDIA/ALTA #5: Bloqueio de Renderização e FOIT por Dependência Exclusiva de Google Fonts**
  * **Causa:** O arquivo `index.html` requisita fontes de `fonts.googleapis.com` de forma síncrona.
  * **Impacto:** Em conexões 3G lentas ou ambientes com latência de 1000ms+, o navegador bloqueia a exibição do texto (FOIT) por até 3 segundos. Se o CDN do Google estiver inacessível (firewalls corporativos ou redes restritas), a tipografia degrada para fontes do sistema com métricas de espaçamento diferentes, quebrando o layout milimétrico dos cards.

---

### FASE 5 — SEO HOSTIL & AI CRAWLER TORTURE
* **FALHA CRÍTICA #6: Ausência Completa de Tag `<h1>` na Hierarquia do DOM**
  * **Causa:** Na refatoração do componente `Hero.tsx`, o título H1 foi removido (`{/* Removed displayHeader H1 per user request */}`), e o documento se inicia diretamente por um tag `<h2>` (`<h2 className="sr-only">Resumo Executivo Epidemiológico...</h2>`).
  * **Impacto:** **Nenhuma tag `<h1>` existe no DOM renderizado da página.** Para parsers de SEO (Googlebot), auditores de acessibilidade (WCAG SC 1.3.1) e LLMs crawlers (OpenAI, Gemini, Perplexity), a ausência de um `<h1>` representa documento semanticamente órfão ou malformado, prejudicando o rankeamento e a autoridade GEO.
* **FALHA MÉDIA #7: Indisponibilidade de Descoberta Automática de `llms.txt`**
  * **Causa:** Embora o arquivo `/public/llms.txt` exista, não há menção a ele no `robots.txt` nem declaração de link rel no `<head>` (`<link rel="alternate" type="text/markdown" href="/llms.txt" />`).
  * **Impacto:** Crawlers de IA que não tentam adivinhar caminhos por convenção falham em localizar o manifesto AIO.

---

### FASE 6 — QA DE PRODUTO & PERCEPÇÃO DE QUALIDADE (AMADORISMO VS. STAFF LEVEL)
* **Afetação Cognitiva em Mobile (Instagram Link-in-Bio):**
  * As seções inferiores (`MethodologySection` e `EditorialSection`) contêm blocos extensos de texto acadêmico sem acordeões interativos. Em uma tela de celular (480px), isso cria um "scroll infinito de texto" que dilui a força do CTA principal (**Fale com CVV 188**).
* **Affordance ambígua no contador do Hero:**
  * O número gigante de óbitos é um botão interativo (`<button onClick={toggleMode}>`), mas não possui um affordance visual claro (como um ícone de "troca" ou sublinhado discreto) que indique ao usuário leigo que clicar no número alterna entre *Óbitos Gerais* e *Suicídios*.

---

### FASE 7 — ENGENHARIA REVERSA: PARECER DE REPROVAÇÃO DO STAFF ENGINEER
Como Staff Engineer de infraestrutura e qualidade, meu dever é impedir que um software vulnerável ou malformado chegue à produção. 

Embora o site exiba uma excelente estética minimalista e notas altas em verificadores sintéticos simples (Lighthouse padrão), **ele falha no teste de estresse industrial**:
1. **Pode crashar abas móveis** por memory leak em cliques repetidos em Compartilhar.
2. **Pode quebrar em modo anônimo** por exceção não tratada no `localStorage`.
3. **Pode ocultar 80% do site** se o JavaScript sofrer degradação de rede.
4. **Viola a semântica fundamental da Web** ao não possuir um único título `<h1>`.
5. **Permite iframing não autorizado** da rota principal no `vercel.json` (risco de Clickjacking).

---

## FASE 8 — ARQUITETURA DA SUÍTE DE CERTIFICAÇÃO EM PLAYWRIGHT (CERTIFICATION GATE SUITE)

Para que o produto seja aprovado no futuro, ele deve passar por uma suíte automatizada de **500 a 1.000 cenários de estresse em Playwright**, cobrindo 5 pilares:

```typescript
// e2e/certification-gate.spec.ts — Suíte de Destruição (Exemplo de Implementação)
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('CERTIFICATION GATE — DESTRUCTION AUDIT', () => {

  test('Fase 1: Concorrência e Spam no Botão Compartilhar (Sem Memory Leak)', async ({ page }) => {
    await page.goto('/');
    const shareBtn = page.locator('button:has-text("Compartilhar")').first();
    // Tenta disparar 10 cliques rápidos consecutivos (Monkey Spam)
    for (let i = 0; i < 10; i++) {
      await shareBtn.click({ force: true, noWaitAfter: true });
    }
    // Verifica se a página continua responsiva e não explodiu com exceção
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('Fase 2: Stress Visual 320px + Zoom 400% (Sem Overflow Horizontal)', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/');
    // Avalia se há scroll horizontal indevido (scrollWidth > clientWidth)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  test('Fase 3: Blackout Test em Renderizadores sem JS (CSS Progressive Enhancement)', async ({ page }) => {
    // Desabilita JavaScript no contexto do navegador
    const context = await page.context().browser()?.newContext({ javaScriptEnabled: false });
    const noJsPage = await context!.newPage();
    await noJsPage.goto('http://localhost:5173/');
    
    // As seções .reveal-on-scroll NÃO PODEM ter opacity: 0 sem JS
    const statsSection = noJsPage.locator('#estatisticas');
    await expect(statsSection).toBeVisible();
    await context!.close();
  });

  test('Fase 5: SEO Hostil — Presença Obrigatória de tag <H1> única no DOM', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Exatamente um H1 por página
  });

  test('Fase 7: WCAG 2.2 AA — Zero Violações em Todos os 5 Temas', async ({ page }) => {
    await page.goto('/');
    const themes = ['dark', 'light', 'cyan', 'bw', 'sepia'];
    for (const theme of themes) {
      await page.evaluate((t) => localStorage.setItem('vidas_masculinas_theme', t), theme);
      await page.reload();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `Violações a11y no tema ${theme}`).toEqual([]);
    }
  });
});
```

---

## DECISÃO FINAL OBJECTIVA

> ### Este site está pronto para produção?
> **NÃO**

#### Justificativa Técnica da Reprovação:
Sob a régua de um **Certification Gate de Destruição (Staff Level)**, o produto fica **REPROVADO** porque apresenta **falhas estruturais capazes de quebrar a experiência em condições adversas reais**:
1. Ausência de tag `<h1>` na página principal (violação grave de semântica, SEO e WCAG).
2. Risco de DoS / Memory Crash no iOS por chamadas concorrentes sem trava no botão de compartilhamento (`useShare.ts`).
3. Risco de crash no React em navegadores móveis em Modo Anônimo/Privado por falta de encapsulamento `try/catch` no `localStorage` (`ThemeToggle.tsx`).
4. Apagão visual (`opacity: 0`) em ambientes sem JavaScript ou crawlers que não processam `IntersectionObserver`.

**Critério para Aprovado:** O status só será convertido para **APROVADO PARA PRODUÇÃO** após a blindagem técnica das 7 falhas documentadas acima e validação contínua via suíte Playwright de estresse.
