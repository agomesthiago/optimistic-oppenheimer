# PLAN-ux-ui-best-practices.md — Plano de Melhores Práticas de UX e UI Editorial Institucional

> **Objetivo:** Definir as diretrizes fundamentais de Experiência do Usuário (UX), Arquitetura de Informação e Design de Interface (UI) aplicáveis ao hub **Vidas Masculinas**, assegurando máxima clareza de dados, sobriedade visual e navegação sem fricção.

---

## 1. Princípios Norteadores de UX/UI para Hubs de Dados Institucionais

1. **Leitura Orientada a Capítulos (.01 a .10):** A página única deve conduzir o leitor por uma jornada lógica e incremental de dados sem dispersão ou interrupções comerciais.
2. **Prioridade Absoluta da Clareza do Dado:** O número e a estatística são os protagonistas. Elementos decorativos (glow, gradients agressivos ou fundos desbotados) devem ser eliminados ou restritos a estados interativos (hover).
3. **Design Mobile-First:** Todas as seções, tabelas, gráficos de longevidade e carrosséis devem ser projetados para exibição perfeita em telas de até 480px antes de se expandirem para telas desktop.
4. **Respeito à Carga Cognitiva:** Evitar animações contínuas sem opção de pausa, notificações intrusivas ou *flooding* de leitores de tela.
5. **Navegação por Teclado e Skip Links:** Todo o site deve ser 100% operável via teclado. O link "Pular para o conteúdo principal" deve estar presente, visível ao receber foco, e a ordem de tabulação deve seguir a ordem visual/lógica do DOM.
6. **Sobriedade Editorial:** Dados sensíveis (suicídio, violência, mortalidade) nunca devem ser apresentados com contadores animados de forma que pareçam gamificação. Nenhum elemento de "conquista" ou celebração visual deve ser aplicado a estatísticas de morte.

---

## 2. Matriz de Diretrizes por Seção

### 2.1 Hero & Contador Principal
- **UX:** Oferecer alternância simples de contexto (Mortes Acumuladas, Horário Local, Suicídios) com *feedback* claro do modo ativo.
- **UI:** Numeral de alta legibilidade com fonte monoespaçada tabular (`tabular-nums`), eliminando borrões (`blur`).
- **Microcópia:** Legenda transparente e semanticamente precisa informando a origem do cálculo local no dispositivo.
- **Estabilidade Visual:** Largura reservada no container do número para evitar deslocamento de layout durante a troca de dígitos.

### 2.2 Seção de Longevidade (Comparativo de Expectativa de Vida)
- **UX:** Evitar viés semântico cromático (ex: não usar verde para "vitória" feminina ou vermelho alarmista para a barra masculina).
- **UI:** Trilhos comparativos neutros (`ash-200 / carbon-600` e `carbon-800 / ash-300`). O tom vermelho fica restrito apenas ao indicador de diferença (`-7,0` anos).
- **Hover:** O card de diferença mantém o fundo neutro em repouso e ativa a borda e topo *crimson* sob interação do cursor.

### 2.3 Carrossel de Causas Epidemiológicas (`CauseTicker.tsx`)
- **UX:** Mecanismo explícito e acessível de pausa/retomada com botão `aria-pressed`, garantindo conformidade com a WCAG 2.2.2. A rotação pausada não deve retomar sem ação do usuário.
- **UI:** Tags de categoria epidemiológica padronizadas como pílulas neutras (`[Causa Patológica]` / `[Causa Externa]`), sem colorização de pânico.

### 2.4 Repositório de Conhecimento (FAQ)
- **UX:** Suporte duplo de busca por navegação em categorias temáticas e por filtro textual por palavras-chave em tempo real.
- **UI:** Acordões expansíveis limpos com estados de foco nítidos e transições suaves de altura.

---

## 3. Checklist de Verificação de Qualidade UX/UI

- [ ] A hierarquia de títulos (`h1`, `h2`, `h3`) está perfeitamente ordenada em todas as seções.
- [ ] Todos os elementos interativos possuem área de toque ≥ 44×44px no mobile.
- [ ] O indicador de rolagem no topo da página permanece discreto (2px) sem sobrepor o conteúdo.
- [ ] Os temas Light e Dark mantêm consistência cromática e razões de contraste adequadas.
- [ ] O visual no contador preserva reserva de largura para eliminar Cumulative Layout Shift (CLS).
