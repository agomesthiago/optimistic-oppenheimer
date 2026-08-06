# Arquitetura e Decisões Técnicas

## Visão Geral
O projeto **Vidas Masculinas** é construído como uma Single Page Application (SPA) utilizando React 19, Vite e Tailwind CSS v4.
Como uma aplicação focada em "Storytelling de Dados" e conscientização, as principais diretrizes arquiteturais focam em:
1. **Performance**: Garantir a entrega instantânea do contador (`Time to Interactive` mínimo).
2. **Distribuição**: Capacidade de exportação de dados via Widgets ou Imagens para redes sociais.

## Módulo de Exportação (Compartilhamento)

### `useShare` Hook e `html-to-image`
Para garantir que o usuário consiga compartilhar o status atual dos óbitos (que muda em tempo real), construímos uma arquitetura de renderização sob demanda:

1. A função `exportImage` presente no `useShare` interage com a biblioteca `html-to-image`.
2. O DOM Node alvo deve estar fisicamente renderizado e acessível (mesmo que com `opacity-0` e `pointer-events-none`) para que o `html-to-image` consiga desenhar o canvas corretamente.

### `SharePreviewModal` (Padrão de Render Props)
Foi implementado um componente genérico `SharePreviewModal` para encapsular a lógica de pré-visualização, seleção de formato e conversão final.

- **Render Prop Pattern (`renderCard`)**: Em vez de codificar múltiplos cards dentro do modal, o `SharePreviewModal` recebe uma função `renderCard(props)` injetando propriedades como o `aspectRatio` ('9:16' ou '3:4') no card a ser exportado.
- Isso permite que a mesma infraestrutura seja reaproveitada para:
  - `StoryCard` (Seção Hero)
  - `CauseStoryCard` (Seção de Causas de Morte)
  - `SuicideStoryCard` (Seção de Suicídios)

Essa abstração evitou prop drilling, acoplamento de UI e a duplicação de lógicas de "download" espalhadas pelos botões de compartilhar.

## Estilização
Utilizamos **Tailwind CSS v4** em seu modo mais moderno, tirando proveito da arquitetura zero-config e importando o CSS puro diretamente (`@import "tailwindcss";`). As antigas dependências (como configurações de PostCSS explícitas) foram expurgadas para reduzir a complexidade e tempo de build.

## Acessibilidade e WCAG
Todas as atualizações ativas no DOM (como o tick do relógio) não realizam "flooding" nos leitores de tela. O projeto utiliza um sistema temporizado (via `aria-live="polite"`) que anuncia os sumários de mortes em intervalos espaçados e lógicos (aproximadamente 15 segundos) para proporcionar uma experiência serena a usuários de tecnologias assistivas.
