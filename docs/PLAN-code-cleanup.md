# Plano de Varredura e Limpeza de Código (Code Cleanup)

Este plano descreve a estratégia para analisar o projeto em busca de arquivos de lixo, códigos incompletos, dependências não utilizadas e otimizações gerais da base de código.

---

## 1. Status do Código e Diagnóstico Inicial

* **Análise de Lints:** O linter (`oxlint`) foi executado e retornou **0 erros e 0 avisos** em todos os 22 arquivos analisados. A base de código está sintaticamente limpa.
* **Dependências:** Verificamos no `package.json` a presença de `playwright`, usada pelo script de simulação local.
* **Arquivos Locais:** Identificamos o arquivo [simulate-ui.js](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/simulate-ui.js) no diretório raiz, que serve para simulação de fluxo com Playwright. Ele não é enviado na build final de produção (sendo excluído pela configuração do Vite), mas convém mantê-lo apenas se for utilizado como ferramenta de teste local.

---

## 2. Tarefas e Estratégia de Limpeza

O plano de limpeza focará nas seguintes áreas:

### Fase 1: Auditoria de Arquivos e Scripts do Raiz
- [ ] Avaliar utilidade do arquivo [simulate-ui.js](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/simulate-ui.js). Se for lixo temporário, excluí-lo. Caso contrário, movê-lo para uma pasta de testes organizada (ex: `tests/` ou `scripts/`).
- [ ] Verificar se há arquivos ocultos temporários ou de configuração órfãos no diretório raiz.

### Fase 2: Otimização de CSS e Tailwind
- [ ] Analisar o arquivo [index.css](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/index.css) em busca de classes personalizadas obsoletas ou animações não utilizadas no código do projeto.
- [ ] Revisar configurações estendidas de cor e fonte no [tailwind.config.js](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/tailwind.config.js) para assegurar que apenas tokens realmente consumidos permaneçam na build final.

### Fase 3: Revisão de Componentes e Imports
- [ ] Checar todos os arquivos de componentes em `/src/components` e widgets em `/src/widgets` por imports inativos ou comentários de blocos de códigos antigos (`todo` ou rascunhos).
- [ ] Assegurar que não haja dependências declaradas em `package.json` sem uso em toda a aplicação.

---

## 3. Plano de Verificação

### Testes Automatizados
- Executar `npm run build` após as limpezas para certificar que o build de produção continua 100% funcional.
- Rodar o linter `npm run lint` para monitorar a introdução de novos avisos ou imports não utilizados.

### Verificação Manual
- Validar se a experiência de tela e interações locais continuam estáveis.
