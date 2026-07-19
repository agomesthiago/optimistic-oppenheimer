# Vidas Masculinas — Painel de Conscientização e Dados

<p align="center">
  <strong>Uma visualização de dados em tempo real sobre a urgência da mortalidade masculina no Brasil.</strong>
</p>

<p align="center">
  <a href="#sobre-o-projeto">Sobre</a> •
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#metodologia">Metodologia</a> •
  <a href="#como-rodar">Como Rodar</a> •
  <a href="#licença">Licença</a>
</p>

---

## Sobre o Projeto

Mais de **780.000 homens** morrem por ano no Brasil por diversas causas, muitas delas evitáveis. O **Vidas Masculinas** é uma iniciativa independente e de código aberto projetada com foco em dispositivos móveis (*mobile-first*) para sensibilizar, informar e educar a sociedade sobre a gravidade da mortalidade masculina em território nacional.

A aplicação apresenta:
* **Contador em Tempo Real**: Estimativa baseada em taxas oficiais de mortes de homens no Brasil ao longo do ano corrente e da sessão do usuário.
* **Detalhamento por Causa**: Estatísticas dinâmicas sobre homicídios, acidentes de trânsito, suicídios e patologias prevalentes.
* **Histórias e Contexto**: Abordagem humana além dos frios dados numéricos, visando gerar empatia e ação.
* **Recursos de Apoio**: Atalhos de conscientização e canais de ajuda em saúde mental e prevenção.
* **Design Premium**: Interface minimalista com tema dinâmico (escuro/claro), animações fluidas via GSAP e suporte de acessibilidade.

---

## Tecnologias

O projeto utiliza uma pilha tecnológica moderna e otimizada para web rápida:

* **React 19** & **TypeScript**: Construção de componentes tipados e reativos.
* **Vite**: Bundler ultra-rápido para o ambiente de desenvolvimento e build.
* **Tailwind CSS**: Estilização responsiva e ágil com foco em performance visual.
* **GSAP (GreenSock Animation Platform)**: Micro-animações e transições de interface elegantes.
* **Oxlint**: Linter de altíssima performance para garantir a qualidade estática do código.

---

## Metodologia de Dados

Os dados exibidos na aplicação são projetados com base em informações consolidadas de órgãos públicos federais de saúde e estatística do Brasil:
1. **DATASUS (Sistema de Informações sobre Mortalidade - SIM)** do Ministério da Saúde.
2. **IBGE (Instituto Brasileiro de Geografia e Estatística)**.

O cálculo em tempo real é obtido a partir da média histórica anualizada de óbitos masculinos, convertida para uma taxa fracionada por segundo, permitindo estimar o impacto acumulado ao longo do dia, do ano e do tempo de navegação do usuário.

*Para ler a metodologia completa, consulte a seção dedicada na própria aplicação ou navegue pelo arquivo de utilitários de mortalidade em `src/utils/mortality.ts`.*

---

## Integração via Widgets

O **Vidas Masculinas** foi projetado para ser facilmente incorporado a portais de notícias, blogs, sites de ONGs e páginas institucionais por meio de formatos de integração nativos e leves.

---

### Opção A: Script de Embed Dinâmico
Insere o widget dinamicamente no seu HTML. Herda a fonte e cores do site hospedeiro, oferecendo integração visual nativa.

#### Exemplo de Uso
```html
<div id="vidas-masculinas-widget" data-border="true"></div>
<script type="module" src="https://cdn.jsdelivr.net/gh/agomesthiago/optimistic-oppenheimer@latest/dist/widgets/embed.js" defer></script>
```

#### Pré-visualização
<p align="center">
  <img src="./public/images/widget-embed.png" alt="Preview Embed Widget" width="400">
</p>

---

### Opção B: Web Component Nativo
Utiliza Custom Elements para integração limpa e moderna. Herda os estilos globais do site hospedeiro de forma flexível.

#### Exemplo de Uso
```html
<!-- Exemplo em Tema Escuro -->
<vidas-masculinas-counter border="true"></vidas-masculinas-counter>

<!-- Exemplo em Tema Claro -->
<div style="background-color: white; color: black; padding: 1rem;">
  <vidas-masculinas-counter border="true"></vidas-masculinas-counter>
</div>

<script type="module" src="https://cdn.jsdelivr.net/gh/agomesthiago/optimistic-oppenheimer@latest/dist/widgets/web-component.js" defer></script>
```

#### Pré-visualização
<p align="center">
  <img src="./public/images/widget-dark.png" alt="Preview Web Component Dark" width="400">
  <br>
  <img src="./public/images/widget-light.png" alt="Preview Web Component Light" width="400">
</p>

---

### Opção C: API de Dados (JSON Bruto)
Se você deseja construir seu próprio layout, pode ler diretamente as taxas oficiais de mortalidade projetadas por segundo a partir da nossa API estática hospedada via CDN gratuita:

* **Endpoint JSON**: `https://raw.githubusercontent.com/agomesthiago/optimistic-oppenheimer/master/public/data/mortality-stats.json`

---

### Opção D: Incorporação Simples via Iframe
Caso não queira rodar scripts JavaScript na sua página, pode utilizar a incorporação clássica por iframe:

```html
<iframe 
  src="https://vidasmasculinas.com.br/widget/contador" 
  width="100%" 
  height="420" 
  frameborder="0" 
  scrolling="no" 
  style="border: none; max-width: 480px; overflow: hidden;"
  title="Contador Vidas Masculinas">
</iframe>
```

---

## Licença

Este projeto está sob a licença [MIT](./LICENSE). Sinta-se livre para usar, modificar e distribuir, desde que mantenha os créditos originais.

---

<p align="center">
  <em>Desenvolvido com o propósito de quebrar o silêncio e salvar vidas.</em>
</p>
