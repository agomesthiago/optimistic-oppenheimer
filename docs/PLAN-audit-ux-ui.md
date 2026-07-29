# PLANO ARQUITETURAL DE UX, UI E ACESSIBILIDADE — VIDAS MASCULINAS (PLAN-audit-ux-ui)

> **Status:** Redação Técnica Normalizada e Arquitetura Institucional Validada  
> **Modo:** `/plan` (Projeto institucional focado em ambiente local)  
> **Responsável:** Principal UX/UI Architect & Especialista WCAG 2.1/2.2  
> **Diretriz Geral:** O site *Vidas Masculinas* é um Knowledge Hub institucional baseado em dados. O objetivo editorial é comunicar com máxima clareza, sobriedade e rigor metodológico a mortalidade masculina no Brasil. Estão expressamente banidas lógicas de conversão, terminologia de funil comercial ("CTA"), alarmismo cromático ou ornamentos técnicos desnecessários.

---

## 1. Matriz de Auditoria Editorial, Normativa e Arquitetural

| # | Item da Auditoria | Arquivo Afetado | Prioridade | Parecer Técnico | Justificativa Editorial e Normativa |
|---|-------------------|-----------------|------------|-----------------|-------------------------------------|
| 1 | **2.1** Semântica cromática da Longevidade | `src/components/LifeExpectancySection.tsx` | **Crítica** | **Manter / Ajustar:** Padronizar exclusivamente em tokens reais do design system: trilho neutro de referência em `bg-ash-200 dark:bg-carbon-600` (#e0e0e0 / #222222) e barra masculina em `bg-carbon-800 dark:bg-ash-300` (#111111 / #d4d4d4). | Em dados epidemiológicos, a longevidade feminina atua como linha de base estatística institucional, não como conquista moral ("verde = aprovação"). Elimina viés ideológico/emocional indevido e descarte de hex/tokens arbitrários. |
| 2 | **2.2** Efeito blur no contador Hero | `src/components/Hero.tsx`<br>`index.css` | **Crítica** | **Manter / Ajustar:** Erradicar o desfoque (`blur`) em `glowPulse`, aplicando sombra limpa sem difusão tipográfica e blindagem estrita via `prefers-reduced-motion`. | O número de óbitos é a tese central do site. A blindagem via `prefers-reduced-motion` atua como **boa prática essencial de acessibilidade vestibular (suporte complementar a WCAG 2.2.2 e 2.3.3)**, diferenciando-se de WCAG 2.3.1 (que rege limiares de flash). |
| 3 | **2.3** Controle de pausa no Carrossel | `src/components/CauseTicker.tsx` | **Crítica** | **Manter / Ajustar:** Fornecer mecanismo explícito de pausa/parada (`button` acessível com atributo `aria-pressed`, posicionado como o **primeiro controle focalizável** da seção); ao receber foco de teclado ou hover, o carrossel pausa automaticamente e **não deve voltar a rodar sozinho sem ação explícita do usuário**. | Exigência normativa WCAG 2.2.2 (conteúdo em movimento > 5s). A norma exige controle explícito acessível e impede que o carrossel retorne ao fluxo autônomo após pausa acionada por foco ou hover. |
| 4 | **3.3** Contraste Normativo em Dark Mode | `src/components/Hero.tsx`<br>`LifeExpectancySection.tsx` | **Alta** | **Ajustar:** Promover textos normais de apoio de `dark:text-ash-500` (#737373) para `dark:text-ash-400` (#9a9a9a). Aplicar distinção formal de contraste segundo WCAG 1.4.3 e 1.4.11. | Separação estrita dos limiares WCAG AA: **Texto normal** (mínimo 4.5:1), **Texto grande** ($\ge 18\text{pt}$ ou $\ge 14\text{pt}$ negrito: mínimo 3:1) e **Elementos não textuais** (componentes/infográficos: mínimo 3:1). Evita impor regra cega para todos os elementos. |
| 5 | **3.4** `aria-live` funcional no contador | `src/components/Hero.tsx` | **Alta** | **Manter:** Implementar região `sr-only` com cadência estável (evitando flooding e mantendo previsibilidade assistiva via padrão `useRef` + intervalo estável) e guard defensivo de hidratação. | O princípio arquitetural é prevenir poluição sonora para usuários de leitores de tela e garantir previsibilidade na progressão estatística, sem idolatrar intervalos fixos sem validação de uso. |
| 6 | **3.1** Microcópia do contador de sessão | `src/components/Hero.tsx` | **Média** | **Manter / Ajustar:** Retificar legenda para: *"Cálculo local estimado a partir do primeiro acesso neste dispositivo"*. | Precisão epistemológica. Evita ambiguidades que sugiram rastreamento global no servidor, fortalecendo a credibilidade científica do hub. |
| 7 | **3.2** Barra de progresso de rolagem | `src/components/Header.tsx` | **Baixa (Remover)** | **Remover:** Excluir especificação de barra de progresso horizontal em `Header.tsx`. | **Overengineering.** A página já possui orientação espacial explícita por capítulos numerados (`.01`, `.02`...). Um indicador de scroll não adiciona ganho cognitivo. |
| 8 | **4.2** Cores por severidade nas Causas | `src/utils/mortality.ts`<br>`CauseTicker.tsx` | **Baixa (Remover)** | **Remover / Ajustar:** Rejeitar codificação cromática de alarme (âmbar/vermelho) por severidade. Usar apenas tag tipográfica neutra (`[Causa Externa]` vs `[Causa Patológica]`). | Cores de alerta geram falso alarme ou hierarquia moral de tragédia (como se homicídio fosse "mais grave" que infarto). Sobriedade exige uniformidade cromática. |
| 9 | **4.3** Ação utilitária de compartilhamento | `src/components/Hero.tsx` | **Baixa** | **Ajustar:** Manter botão em estilo sóbrio (ardósia neutra ou outline limpo), tratando o elemento estritamente como **ação utilitária secundária** de compartilhamento, não como peça de marketing ou "CTA". | O Hero não é funil de conversão. A ação de compartilhamento é um recurso funcional e não deve disputar peso visual com o número estatístico central. |
| 10 | **4.1** Busca textual no FAQ | `src/components/FAQSection.tsx` | **Baixa (Remover)** | **Remover:** Rejeitar input de busca com debounce. Manter apenas navegação limpa por categorias temáticas. | Em FAQ institucional com 24 perguntas curadas, busca textual é excesso de complexidade. A exploração por categorias é superior cognitivamente. |

---

## 2. Distinção Normativa Formal de Contraste — Norma WCAG 2.1 (Critérios 1.4.3 e 1.4.11)

A arquitetura tipográfica e infográfica do projeto adota formalmente os três limiares normativos distintos:

1. **Texto Normal (< 18pt regular ou < 14pt negrito):**
   - *Exigência Normativa (WCAG AA):* **4.5:1** mínimo.
   - *Ação no Projeto:* Substituição de `dark:text-ash-500` ($L = 0.17189$, contraste real 4.18:1 contra `carbon-900`) por `dark:text-ash-400` ($L = 0.32310$, contraste real **7.03:1**).
2. **Texto Grande ($\ge 18\text{pt}$ regular ou $\ge 14\text{pt}$ negrito):**
   - *Exigência Normativa (WCAG AA):* **3:1** mínimo.
   - *Ação no Projeto:* Subtítulos e títulos de seções em `dark:text-ash-300` (contraste real **13.36:1**) superam com sobra o limiar AA sem achatar a leitura do texto principal (`ash-100`).
3. **Elementos Não Textuais (Critério WCAG 1.4.11 — Gráficos, Trilhos e Bordas):**
   - *Exigência Normativa (WCAG AA):* **3:1** mínimo contra cores adjacentes.
   - *Ação no Projeto:* As barras comparativas de mortalidade e longevidade utilizam tokens nativos com contraste superior a 3:1 em relação ao fundo dos cards, garantindo perfeita legibilidade infográfica.

---

## 3. Roteiro de Implementação em Fases (Lógica Editorial e Institucional)

O cronograma de execução local está estruturado na ordem de impacto institucional e rigor metodológico:

### Fase 1: Integridade Semântica, Legibilidade do Dado e Contraste Normativo (Prioridade Crítica / Alta)
- **Objetivo:** Garantir que o número principal e os gráficos comparativos não contenham ruído visual, viés moral ou falha de contraste WCAG AA.
- **Entregáveis:**
  1. Padronizar a barra de longevidade em [`src/components/LifeExpectancySection.tsx`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/LifeExpectancySection.tsx) com tokens reais: trilho de referência em `bg-ash-200 dark:bg-carbon-600` e barra masculina em `bg-carbon-800 dark:bg-ash-300`.
  2. Remover desfoque (`blur`) de `glowPulse` em [`src/index.css`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/index.css) e assegurar supressão nativa via `prefers-reduced-motion` (boa prática de acessibilidade vestibular para WCAG 2.2.2/2.3.3, sem confundir com WCAG 2.3.1).
  3. Promover textos normais de apoio de `dark:text-ash-500` para `dark:text-ash-400` em todo o projeto, assegurando WCAG AA (4.5:1) sem regra cega para textos grandes ou bordas.

### Fase 2: Acessibilidade Assistiva e Controle Não-Intrusivo de Movimento (Prioridade Crítica / Alta)
- **Objetivo:** Oferecer experiência acessível e respeitosa a leitores de tela e navegação assistiva, sem poluição sensorial.
- **Entregáveis:**
  1. Implementar região `aria-live="polite"` oculta no [`src/components/Hero.tsx`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/Hero.tsx) focada em prevenir *flooding* e manter previsibilidade na leitura, via padrão `useRef` estável e *guard clause* de hidratação.
  2. Fornecer mecanismo explícito de pausa/parada (`button aria-pressed`), operável por teclado e posicionado como **primeiro controle focalizável** em [`src/components/CauseTicker.tsx`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/CauseTicker.tsx); ao ser pausado (por clique, foco ou hover), o carrossel **não deve retornar sozinho** sem ação explícita do usuário.

### Fase 3: Rigor Epistemológico na Microcópia e Sobriedade Editorial (Prioridade Média / Baixa)
- **Objetivo:** Limpeza conceitual, precisão científica e erradicação de alarmismo visual ou concorrência com o dado.
- **Entregáveis:**
  1. Atualizar microcópia do contador em [`src/components/Hero.tsx`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/Hero.tsx) para: *"Cálculo local estimado a partir do primeiro acesso neste dispositivo"*.
  2. Calibrar o botão de compartilhamento no Hero estritamente como **ação utilitária secundária**, mantendo acabamento sóbrio em outline/ghost ou ardósia neutra.
  3. Manter o FAQ organizado por categorias temáticas sem input de busca, e manter o carrossel de causas com tratamento cromático uniforme.

---

## 4. Status de Implementação e Evidências Técnicas

| Fase | Escopo | Status de Implementação | Evidência de Build e Limites de Validação |
| :--- | :--- | :---: | :--- |
| **Fase 1** | Integridade Semântica, Legibilidade & Contraste (WCAG 1.4.11 / AA) | **Implementada** | • Tokens de longevidade padronizados para `ash-200 / carbon-600` (referência) e `carbon-800 / ash-300` (barra masculina) em `LifeExpectancySection.tsx`.<br>• Desfoque (`blur`) removido do número principal e supressão via `prefers-reduced-motion` aplicada.<br>• Textos secundários revisados nas seções modificadas foram promovidos para tokens (`ash-400`) com contraste-alvo compatível com WCAG AA para texto normal, sujeito à verificação renderizada final em navegadores. |
| **Fase 2** | Acessibilidade Assistiva & Controle Não-Intrusivo de Movimento | **Implementada** | • Região `aria-live="polite"` oculta com hidratação defensiva e cadência estável (15s) implementada em `Hero.tsx`.<br>• Mecanismo de pausa/parada inserido em `CauseTicker.tsx` como primeiro elemento focalizável com `aria-pressed`, sem retomada automática após pausa.<br>• Ajustes orientados a WCAG AA, com alguns pares cromáticos excedendo esse mínimo. Validação com leitores de tela reais (NVDA/VoiceOver) permanece necessária. |
| **Fase 3** | Rigor Epistemológico na Microcópia & Sobriedade Editorial | **Implementada** | • Legenda do contador de sessão em `Hero.tsx` retificada para: *"Cálculo local estimado a partir do primeiro acesso neste dispositivo"*, eliminando ambiguidade de rastreamento remoto.<br>• Taxonomia epidemiológica neutra (`[Causa Patológica]` / `[Causa Externa]`) aplicada em `CauseTicker.tsx`, substituindo colorização por severidade.<br>• Compilada com sucesso em build de produção (`npm run build`), sem erros de tipagem ou empacotamento; validação visual e assistiva manual permanece necessária. |

---

### Nota Epistemológica sobre Validação
A verificação automatizada via `npm run build` confirma unicamente a integridade sintática, tipagem TypeScript estática, resolução de módulos e empacotamento sem erros de compilação. **Nenhuma regressão de build ou tipagem foi observada; regressões visuais, contraste real em tela e conformidade assistiva dependem de inspeção manual em light/dark, desktop/mobile e navegação por teclado.**
