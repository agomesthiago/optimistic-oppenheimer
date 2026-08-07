# Plano de Revisão de Copy (Copy Editing & Copywriting)

Este plano foi criado para estruturar a revisão e melhoria dos textos (copy) do projeto **Vidas Masculinas**, aplicando as metodologias estruturadas dos skills `copy-editing` (The Seven Sweeps Framework) e `copywriting` (Foco em conversão e clareza).

## 🔴 Hard Gate / Copy Brief Lock

Antes de escrevermos ou alterarmos qualquer texto, precisamos validar o Contexto e o "Copy Brief", conforme exigido pela metodologia de Copywriting (Phase 1 e Phase 2). 

### Perguntas de Contexto (Socratic Gate)

Por favor, responda aos pontos abaixo para que possamos definir o escopo exato da edição:

1. **Escopo da Revisão**: Vamos revisar toda a Landing Page atual ou há seções específicas (ex: Hero, CTA final, Seção de Suicídios) que você quer priorizar?
2. **Público-Alvo (Audience)**: Quem exatamente queremos impactar? (ex: homens em sofrimento, formuladores de políticas públicas, jornalistas, público geral buscando informações). Qual o nível de consciência deles ao chegar na página?
3. **Ação Principal (CTA)**: Qual é a única ação principal que queremos que o usuário tome? (ex: Compartilhar os dados, ler o dataset, buscar ajuda no CVV, etc.)
4. **Voz e Tom (Voice and Tone)**: Queremos manter um tom estritamente jornalístico/científico ou queremos adicionar uma camada mais empática/emocional para gerar mais impacto ("Heightened Emotion")?

---

## Proposed Changes (Fluxo de Trabalho)

Uma vez que as perguntas acima sejam respondidas e o "Copy Brief" seja travado (Brief Lock), a execução seguirá estas etapas:

### 1. Auditoria e Copywriting (Geração de Opções)
- Mapeamento das estruturas atuais ("Above the Fold", CTAs, Provas Sociais).
- Geração de 2 a 3 alternativas de *Headlines* e *CTAs*, com justificativas claras baseadas nos princípios de conversão.

### 2. Edição Iterativa (The Seven Sweeps Framework)
A copy final passará pelas 7 varreduras obrigatórias:
1. **Clarity**: Eliminar jargões e simplificar estruturas.
2. **Voice and Tone**: Garantir coesão na personalidade do texto.
3. **So What**: Conectar todos os dados de mortalidade a um impacto real ("por que eu devo me importar?").
4. **Prove It**: Validar se as estatísticas (ex: IBGE, DATASUS) estão bem ancoradas.
5. **Specificity**: Trocar palavras vagas por números reais e tempos concretos.
6. **Heightened Emotion**: Garantir que a dor da desigualdade e do suicídio masculino seja sentida sem ser manipuladora.
7. **Zero Risk**: Remover atritos próximos aos botões de compartilhamento ou links de ajuda (CVV).

### 3. Agentes Envolvidos
- **`project-planner`**: Para definir e ajustar o escopo da revisão.
- **`copy-editor`** (via skill copy-editing): Para conduzir a varredura e refino dos textos (Seven Sweeps).
- **`frontend-specialist`**: Para aplicar os novos textos no código React de forma segura (ex: `Hero.tsx`, mantendo a responsividade *mobile-first*).

---

## Verification Plan

### Checklist de Conclusão (Hard Stop)
- [ ] Copy brief foi confirmado pelo usuário.
- [ ] Novas copys foram estruturadas passando pelas 7 varreduras.
- [ ] Alternativas de Headlines e CTAs foram providenciadas.
- [ ] O layout Mobile (480px) foi testado e não quebrou com os novos textos.
