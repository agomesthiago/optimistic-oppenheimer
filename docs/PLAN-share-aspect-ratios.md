# Plano de Implementação: Compartilhamento Multi-Formato (Spotify-like)

## Phase -1: Context Check
O projeto atualmente suporta o compartilhamento das estatísticas de mortalidade gerando uma imagem via `html-to-image` no tamanho fixo de 1080x1920 (9:16). O usuário deseja poder exportar em diferentes proporções (ex: 1080x1440, 1:1, etc.) assim como o Spotify permite ao compartilhar músicas e letras, para se adequar melhor a plataformas como feed do Instagram, LinkedIn, ou WhatsApp.

## Phase 0: Socratic Gate (Open Questions)
Antes de iniciarmos a implementação deste plano, precisamos de algumas confirmações:
1. **Quais formatos exatos deseja suportar?** (Ex: 9:16 para Stories, 1:1 quadrado para feed, 4:5 para Instagram portrait?)
2. **Como deve ser a experiência do usuário (UX)?** Ao clicar no botão de compartilhar, abre-se um Modal com um carrossel preview das opções de tamanho para ele escolher, ou teremos botões separados?
3. **Fundo/Cores:** Os cards manterão o fundo atual (`radial-gradient`) e layout apenas reajustado nas proporções, ou cada formato terá um layout levemente distinto?

## Task Breakdown

### 1. Refatorar `CauseStoryCard.tsx` (Componente Base)
- Adicionar a prop `aspectRatio` (ex: `'9:16' | '4:5' | '1:1'`).
- Ajustar estilos inline de largura/altura (`width`/`height`) e paddings (`p-20` vs `p-10`) com base na proporção selecionada para garantir que o texto não quebre ou fique minúsculo/gigante.

### 2. Criar Componente de Preview/Seleção (UX)
- Criar `SharePreviewModal.tsx`:
  - Exibe miniaturas reais das proporções disponíveis (renderizando o `CauseStoryCard` escalonado para caber na tela usando CSS `transform: scale()`).
  - Botões para selecionar o formato desejado.
  - Botão de confirmação "Gerar Imagem".

### 3. Atualizar Hook `useShare.ts`
- Passar a depender do elemento que o usuário escolheu gerar.
- Opcionalmente, pode ser necessário renderizar todos os formatos em `document.body` de modo invisível, e o hook `shareToStories` recebe qual `elementId` capturar com o `html-to-image`.

### 4. Ajustes no Layout Base (App.tsx / CauseTicker.tsx)
- Onde havia a chamada direta para `shareToStories`, passará a abrir o `SharePreviewModal`.

## Agent Assignments
- **Frontend Specialist / UI UX**: Responsável por criar o modal e garantir que os layouts nos diferentes aspect ratios fiquem consistentes e com tipografia legível.
- **Performance Engineer**: Garantir que a renderização paralela (hidden) não degrade o TTI e GPU.

## Verification Checklist
- [ ] Usuário clica em compartilhar e o Modal/Preview aparece.
- [ ] Trocar a opção de tamanho reflete visualmente a nova proporção.
- [ ] A exportação final (Download/Share nativo) tem a resolução correta (ex: 1080x1080).
- [ ] Nenhuma quebra de layout de texto no formato menor (1:1).
