# Plano de Implementação — Alternativas de Widgets (Além do Iframe)

Este plano descreve o design e as etapas de implementação para oferecer formatos adicionais de widgets no projeto **Vidas Masculinas**, permitindo que terceiros integrem os contadores e dados nos seus próprios sites de forma nativa e customizável.

## 1. Visão Geral das Ofertas Propostas

### A. Embed Script Dinâmico (Opção A)
* **Como funciona**: O parceiro adiciona uma tag `<script>` apontando para o nosso build hospedado e insere um elemento âncora no HTML:
  ```html
  <div id="vidas-masculinas-widget" data-theme="dark"></div>
  <script src="https://cdn.jsdelivr.net/gh/agomesthiago/optimistic-oppenheimer@latest/dist/widgets/embed.js" defer></script>
  ```
* **Vantagens**: Fácil de instalar, atualiza automaticamente sempre que publicarmos alterações no GitHub e permite customização simples via atributos `data-*`.

### B. Web Component Nativo (Opção B)
* **Como funciona**: Criação de um Custom Element (`<vidas-masculinas-counter>`) registrado no navegador:
  ```html
  <vidas-masculinas-counter theme="light" show-details="true"></vidas-masculinas-counter>
  <script src="https://cdn.jsdelivr.net/gh/agomesthiago/optimistic-oppenheimer@latest/dist/widgets/web-component.js" defer></script>
  ```
* **Vantagens**: Código semântico, moderno e flexível. O Shadow DOM não será utilizado (ou será configurado em modo `open` sem isolamento estrito) para permitir que as folhas de estilo do site hospedeiro (incluindo fontes e cores globais) modifiquem a aparência do widget.

### C. JSON Estático no GitHub (Opção D - API-first)
* **Como funciona**: Disponibilização de um arquivo JSON estático e atualizado com as estatísticas de mortalidade, hospedado diretamente no GitHub Raw ou GitHub Pages do repositório:
  ```
  https://raw.githubusercontent.com/agomesthiago/optimistic-oppenheimer/master/public/data/mortality-stats.json
  ```
* **Vantagens**: Total liberdade para desenvolvedores externos consumirem os dados puros via `fetch` e criarem layouts customizados, sem custo de servidor para nós (infraestrutura servida pela CDN do GitHub).

---

## 2. Cronograma de Tarefas e Arquitetura

### Fase 1: Geração e Hospedagem dos Dados Brutos (JSON)
* **Objetivo**: Implementar o JSON para a Opção D e criar uma rotina de atualização automática.
* **Tarefas**:
  - [ ] Criar o arquivo `public/data/mortality-stats.json` contendo as constantes e projeções de mortalidade (base DATASUS/IBGE).
  - [ ] Configurar um script que atualize periodicamente ou projete dinamicamente esses dados se necessário.

### Fase 2: Desenvolvimento dos Widgets (JS Embed & Web Component)
* **Objetivo**: Criar os scripts de injeção e customização visual.
* **Tarefas**:
  - [ ] Desenvolver o script de embed dinâmico (`src/widgets/embed.ts`) que mapeia a div `#vidas-masculinas-widget`, cria o HTML do contador e aplica transições com GSAP/CSS herdando os estilos do site pai.
  - [ ] Criar a classe do Custom Element (`src/widgets/web-component.ts`) estendendo `HTMLElement` e registrando `customElements.define('vidas-masculinas-counter', ...)`.
  - [ ] Configurar o Vite (`vite.config.ts`) para gerar bundles separados para esses dois scripts na pasta `/dist/widgets/`.

### Fase 3: Distribuição e Documentação
* **Objetivo**: Publicar os builds e documentar os formatos de uso.
* **Tarefas**:
  - [ ] Integrar no `README.md` instruções claras de uso para as 3 opções (Embed Script, Web Component e JSON raw via CDN).
  - [ ] Utilizar a CDN gratuita **jsDelivr** que espelha as tags de release do próprio GitHub (`cdn.jsdelivr.net/gh/usuario/repo@versao/...`).

---

## 3. Plano de Verificação

### Testes Automatizados e de Integração
- Criar um arquivo HTML de teste local (`src/widgets/test.html`) simulando um site externo limpo (sem Tailwind global) e outro com Tailwind, para verificar se os widgets herdam os estilos corretamente sem quebrar layouts.
- Rodar o linter e o build estático para garantir que as novas entradas do Vite geram bundles sem erros.
