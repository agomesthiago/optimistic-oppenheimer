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

O **Vidas Masculinas** foi projetado para ser facilmente incorporado a portais de notícias, blogs, sites de ONGs e páginas institucionais por meio de widgets responsivos e leves.

### Como Incorporar o Contador em seu Site

Para exibir o contador de mortes acumuladas em tempo real em seu site, adicione o seguinte código HTML no local desejado:

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

Caso queira integrar outros formatos de cards ou gráficos, consulte as opções de embeds no painel principal ou entre em contato com os mantenedores.

---

## Licença

Este projeto está sob a licença [MIT](./LICENSE). Sinta-se livre para usar, modificar e distribuir, desde que mantenha os créditos originais.

---

<p align="center">
  <em>Desenvolvido com o propósito de quebrar o silêncio e salvar vidas.</em>
</p>
