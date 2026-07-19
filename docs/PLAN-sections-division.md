# Plano de Divisão de Seções e Indicadores de Páginas

Este plano descreve as melhorias de layout para delimitar claramente as seções do site no mobile (evitando que pareça um fluxo contínuo de números) e introduzir os indicadores de seção ausentes (`.02`, `.03`, `.04`, `.05`) de forma consistente.

---

## 1. Diagnóstico

* **Falta de Divisão Clara no Mobile:** No mobile, as seções e blocos de estatísticas (como as estatísticas secundárias da Hero e as seções subsequentes) empilham verticalmente sem divisores visuais adequados. Isso gera ruído e prejudica a escaneabilidade.
* **Indicadores Incompletos:** O indicador `.01` aparece no canto inferior esquerdo da Hero (Desktop/Mobile), mas as demais seções (`Ajuda`, `Causas`, `Contexto` e `Metodologia`) não possuem indicadores correspondentes, quebrando a consistência do design do site.

---

## 2. Proposta de Alterações

### Hero & Estatísticas (Seção .01)
* Adicionar uma borda superior e um espaçamento mais definido para o bloco de estatísticas secundárias da Hero no mobile, separando-o claramente do botão "Espalhe Consciência".
* Garantir que o indicador `.01` permaneça visível como âncora inicial.

### Seção de Ajuda / Recursos (Seção .02)
* Adicionar o indicador `.02` estilizado com fonte mono ao cabeçalho da seção.
* **Arquivo:** [ResourcesSection.tsx](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/ResourcesSection.tsx)

### Seção de Detalhes por Causa (Seção .03)
* Adicionar o indicador `.03` estilizado com fonte mono ao cabeçalho da seção.
* **Arquivo:** [App.tsx](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/App.tsx)

### Seção de Contexto (Seção .04)
* Adicionar o indicador `.04` estilizado com fonte mono ao cabeçalho da seção.
* **Arquivo:** [ContextSection.tsx](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/ContextSection.tsx)

### Seção de Metodologia (Seção .05)
* Adicionar o indicador `.05` estilizado com fonte mono ao cabeçalho da seção.
* **Arquivo:** [MethodologySection.tsx](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/MethodologySection.tsx)

---

## 3. Padrão Visual Sugerido para Cabeçalhos

Adotaremos um padrão minimalista para os cabeçalhos de todas as seções secundárias:

```tsx
<div className="flex flex-col items-center mb-12">
  <span className="text-sm font-mono font-bold text-slate-400 dark:text-ash-600 mb-2">.02</span>
  <h2 className="text-sm font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-ash-400 text-center">
    [Título da Seção]
  </h2>
</div>
```

---

## 4. Plano de Verificação

### Testes
* Executar `npm run build` após as alterações para garantir integridade.
* Testar a renderização mobile simulando larguras menores (ex: iPhone XR) usando o Playwright.
