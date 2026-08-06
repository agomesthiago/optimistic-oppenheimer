# Plano de Atualização da Documentação (Docs Update)

## Contexto e Objetivo
Realizar uma varredura completa na documentação do projeto, sincronizando os manuais, arquitetura e README com as atualizações mais recentes do código (incluindo migração para Tailwind v4, novos Aspect Ratios dinâmicos de compartilhamento e limpeza de configurações antigas). O objetivo é gerar documentações de alta qualidade (living documentation) através da skill `code-documentation-doc-generate`.

## 🔴 Gate Socrático: Questões para Alinhamento
Antes da execução (`/create`), por favor, confirme:
1. **Público Alvo Principal**: A documentação atualizada deve focar em desenvolvedores (contribuidores técnicos) ou inclui também um guia de negócios/design focado em produto?
2. **Novos Arquivos**: Devemos criar arquivos de documentação técnica faltantes (ex: `ARCHITECTURE.md`, `CODEBASE.md`) ou focar apenas em atualizar os existentes (ex: `README.md`)?
3. **Pipeline Automático**: O objetivo envolve criar uma automação no Github Actions para validar links da documentação no futuro, ou apenas atualizar o texto manualmente?

---

## 📋 Breakdown de Tarefas

### Fase 1: Análise e Auditoria de Documentação (Analysis)
- [ ] Mapear as documentações existentes no diretório raiz (`README.md`, `CONTRIBUTING.md`, etc.).
- [ ] Ler o `dataset.json` atualizado para extrair o changelog mais recente.
- [ ] Identificar configurações removidas recentemente (como o `tailwind.config.js` e `postcss.config.js` que não existem mais com a v4).

### Fase 2: Planejamento de Atualização (Planning)
- [ ] Definir estrutura atualizada do `README.md` (revisar stack tecnológica mencionada).
- [ ] Especificar novas features (Sistema de compartilhamento dinâmico 9:16 e 3:4).
- [ ] Projetar a adição ou atualização de um `ARCHITECTURE.md` para mapear os novos Hooks e lógica dos modais genéricos.

### Fase 3: Solução e Refinamento de Texto (Solutioning)
- [ ] Aplicar melhores práticas de terminologia e linguagem.
- [ ] Manter um tom consistente, sem vazar informações confidenciais ou segredos de ambiente.

### Fase 4: Implementação (Checklist de Execução)
1. Editar `README.md` atualizando a seção "Tech Stack".
2. Editar `README.md` adicionando documentação sobre a exportação de imagens (`SharePreviewModal`).
3. (Se aprovado) Criar `ARCHITECTURE.md` focando nos padrões do portal e redimensionamento (`useShare`, `html-to-image`).
4. Executar verificação automatizada ou manual para garantir que não há links quebrados na documentação (ex: references antigas).

---

## Agentes Sugeridos
- `frontend-specialist`: Para ler o código React atual e explicar as atualizações técnicas a serem documentadas.
- `docs-architect`: Para liderar a estruturação, escrita e padronização dos textos Markdown.

---
*Gerado via skill code-documentation-doc-generate.*
