# Plano de Implementação: Redesign do Hero e Compartilhamento (StoryCard)

## 1. Hero (`src/components/Hero.tsx`)
- **Remover Título:** Apagar a renderização de `{displayHeader}` (o texto "estimativa em tempo real - todas as causas").
- **Nova Seção de Compartilhamento:** Transformar o botão atual de compartilhamento em uma seção/bloco com maior destaque visual (ou apenas um reposicionamento intencional) imediatamente abaixo do contador.

## 2. Imagem de Compartilhamento (`src/components/StoryCard.tsx`)
- **Minimalismo Extremo:** Remover o título ("Mortalidade Masculina no Brasil"), a tagline, o subtítulo descritivo e o link do rodapé.
- **Foco no Dado:** Manter exclusivamente o número renderizado em tamanho grande.
- **Efeito Dramático:** Intensificar o gradiente de fundo vermelho (`accentColor`) e aumentar/ajustar o `textShadow` para dar um efeito neon sangrento mais forte e dramático.
- **Safe Zone do Instagram:** Garantir que o número esteja perfeitamente centralizado no canvas de 1080x1920, respeitando as margens de safe zone dos stories (livre de UI do Instagram).

## 3. Lâmpada e Efeitos Visuais (`src/components/HangingBulb.tsx` / `src/index.css`)
- **Cor do Emissor (Lâmpada):** Alterar o brilho (glow) de branco puro/frio para um tom levemente amarelado (ex: incandescente/quente).
- **Ajuste de Spread (Difusão):** Refinar o `radial-gradient` e o `blur` do emissor principal para que a dispersão da luz faça mais sentido, irradiando claramente a partir do filamento da lâmpada, em vez de ser apenas um borrão global no background.

## Próximos Passos
- Revisar se este plano reflete exatamente o que você deseja para a estética.
- Ao confirmar, aplicarei as alterações no código localmente (sem fazer push ainda).
