# Plano de Implementação — Compartilhamento por Causa (Seção .05)

> **Objetivo**: Adicionar um botão de compartilhamento dinâmico no carrossel da seção **Detalhes por Causa (`.05`)**, permitindo ao usuário exportar um card visual (estilo Instagram Stories 1080x1920) especificamente adaptado para a **causa epidemiológica em destaque** no momento do clique.

---

## 📐 Especificação Técnica & Componentes

### 1. Novo Componente: `CauseStoryCard.tsx`
Criar um componente oculto para exportação gráfica (estilo `StoryCard.tsx`), pré-renderizado em 1080x1920px com foco na causa selecionada:
- **Cabeçalho**: Logo `Vidas Masculinas` + Etiqueta `Desagregação por Causa (01 a 08)`.
- **Título da Causa**: Nome da patologia/causa em destaque (ex.: *Doenças Cardiovasculares*, *Neoplasias*, *Homicídios / Violência*).
- **Número Gigante em Tempo Real**: `formatDeathCount(count)` acumulado para essa causa desde 01/01/2026.
- **Barra Proporcional & Estatísticas**:
  - `Participação`: % do total de mortes masculinas (ex.: *25,4%*).
  - `Estimativa Anual`: ~XXX.XXX mortes/ano no país.
  - `Fonte Oficial`: Órgão e sociedade médica de referência (ex.: *IBGE / SBC*, *INCA*, *IPEA*).
- **Rodapé**: Link público do projeto (`vidasmasculinas.vercel.app`).

### 2. Integração no `CauseTicker.tsx`
- Adicionar o botão de compartilhamento (`Compartilhar esta causa` / `Mostre esse dado`) no painel de navegação ou no cartão principal da seção `.05`.
- Integrar a chamada do hook `useShare` passando o `elementId: 'cause-story-card-export'` e a contagem acumulada da causa ativa.

### 3. Integração com `useShare.ts`
- Reaproveitar o gerador `html-to-image` de alta fidelidade para conversão em PNG.
- Oferecer compartilhamento nativo em dispositivos móveis via `Web Share API` e download direto em computadores desktop.

---

## 📋 Passo a Passo de Implementação

1. **[NEW] `src/components/CauseStoryCard.tsx`**:
   - Componente React para exportação do card da causa ativa.
2. **[MODIFY] `src/components/CauseTicker.tsx`**:
   - Incluir o `<CauseStoryCard />` oculto.
   - Adicionar o botão de compartilhamento com feedback de carregamento (`Preparando imagem...`).
3. **[TEST] Validação Local & Compilação**:
   - Testar a troca de slides e verificar se o PNG gerado reflete fielmente a causa selecionada no momento.
   - Rodar `npm run build` e `oxlint` para garantir zero erros.

---

## 🔍 Critérios de Aceite & Verificação
- [ ] O clique no botão "Compartilhar esta causa" gera um card com o nome, número acumulado, porcentagem e fonte da causa em exibição.
- [ ] Ao mudar o slide (ex.: de Cardiovasculares para Homicídios), o card exportado muda instantaneamente.
- [ ] O layout 1080x1920 mantém o estilo visual minimalista e sóbrio do projeto.
- [ ] O script compila com 0 erros de TypeScript e 0 warnings no linter.
