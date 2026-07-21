# Plano de Arquitetura — Next-Gen SEO, GEO (Generative Engine Optimization) & Prontidão LLM 2030

> **Status**: APENAS PLANEJAMENTO (Nenhum código editado nesta etapa).
> **Projeto**: Vidas Masculinas (`https://vidasmasculinas.vercel.app`)

---

## 🔬 Relatório de Verificação: Uso de Unidades `rem` no Projeto

Conforme verificado na análise estática do repositório:
- **Uso de `rem` em CSS Global & Tailwind**: **CONFIRMADO**. O projeto utiliza `rem` extensivamente em todas as escalas de tipografia (`text-xs` [0.75rem], `text-sm` [0.875rem], `text-base` [1rem], `text-xl` [1.25rem], `text-2xl` [1.5rem]) e espaçamentos (`padding`, `margin`, `gap`).
- **Tipografia Fluida com `clamp()` e `rem`**: Os contadores centrais e títulos em [`Hero.tsx`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/Hero.tsx), [`CauseTicker.tsx`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/CauseTicker.tsx) e [`SuicideSection.tsx`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/components/SuicideSection.tsx) combinam `clamp(4rem, 15vw, 10.5rem)` e `clamp(3.5rem, 11vw, 6.5rem)` com `rem` para garantir acessibilidade e escalabilidade perfeita do zoom no navegador.
- **Cards de Exportação (`StoryCard.tsx` e `CauseStoryCard.tsx`)**: Utilizam valores `rem` explícitos (`text-[2.2rem]`, `text-[4.2rem]`, `fontSize: '11.5rem'`) no canvas 1080x1920.
- **Widgets (`embed.ts` e `web-component.ts`)**: Utilizam `1.5rem`, `0.75rem`, `0.875rem` e `3rem` para isolamento de estilos.
- **Unidades de Viewport Dinâmicas (`dvh`)**: Utilizadas em `index.css` (`100dvh`) para adaptação fluida em telas mobile.

---

## 🏛️ Eixos da Arquitetura SEO & GEO 2030

Com o avanço dos buscadores por IA (ChatGPT, SearchGPT, Claude, Perplexity, Gemini), o SEO tradicional de palavras-chave evoluiu para **GEO (Generative Engine Optimization)** e **E-E-A-T de Dados Estruturados**.

O objetivo deste plano é posicionar o *Vidas Masculinas* como a **fonte primária e autoridade máxima citada por IAs e buscadores tradicionais**.

---

### Eixo 1: Prontidão para Modelos de Linguagem (LLM & AI Crawlers)

#### 1.1 `public/llms.txt` (Padrão Oficial de Ingestão para IAs)
Criar o arquivo `public/llms.txt` seguindo a especificação aberta de transparência para IAs:
- **Resumo Executivo do Projeto**: Declaração curta sobre a missão do *Vidas Masculinas*.
- **Fontes Oficiais Incorporadas**: DATASUS/SIM (Ministério da Saúde) e IBGE 2022.
- **Fatos-Chave e Estatísticas Diretas**:
  - Total anual de óbitos masculinos no Brasil (~800.000 mortes/ano).
  - Participação masculina nos suicídios (77,8% / razão 3,5:1).
  - Fosso de longevidade (Homens: 72,0 anos vs Mulheres: 79,0 anos / −7,0 anos).
  - Contato de Emergência: CVV 188 (`https://cvv.org.br/chat/`).
- **Links da API Estática e Widgets**: Links para ingestão RAG.

#### 1.2 `public/llms-full.txt` (Base de Conhecimento RAG Completa)
Versão estendida em Markdown para ser lida diretamente por crawlers de IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).

---

### Eixo 2: Dados Estruturados Schema.org Avançados (Grafo de Entidades 2030)

Expandir o JSON-LD em [`index.html`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/index.html) para construir um Grafo de Entidades Conectadas:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://vidasmasculinas.vercel.app/#website",
      "url": "https://vidasmasculinas.vercel.app",
      "name": "Vidas Masculinas",
      "description": "Painel de dados oficiais e conscientização sobre a mortalidade masculina e saúde mental no Brasil.",
      "inLanguage": "pt-BR"
    },
    {
      "@type": "Dataset",
      "@id": "https://vidasmasculinas.vercel.app/#dataset",
      "name": "Estatísticas de Mortalidade Masculina no Brasil",
      "description": "Projeção em tempo real e desagregação epidemiológica baseada em dados públicos do DATASUS/SIM e IBGE.",
      "license": "https://creativecommons.org/licenses/by/4.0/",
      "creator": { "@type": "Organization", "name": "Vidas Masculinas" },
      "spatialCoverage": "Brasil",
      "temporalCoverage": "2021/2026"
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://vidasmasculinas.vercel.app/#health-info",
      "name": "Prevenção ao Suicídio e Saúde Mental Masculina",
      "aspect": ["Epidemiology", "Prevention"],
      "citation": ["https://www.gov.br/saude/pt-br", "https://www.ibge.gov.br/"],
      "medicalAudience": "Public"
    }
  ]
}
```

---

### Eixo 3: Prevenção de Canibalização & Mapeamento de Intenção

Para evitar canibalização de palavras-chave entre as seções da página única:
1. **Hierarquia Semântica Rigorosa de Headings (`H1` a `H3`)**:
   - `H1`: *Vidas Masculinas | Mortalidade Masculina no Brasil em Dados* (Único por página).
   - `H2`: Seções específicas por intenção distinta:
     - `.02 Estatísticas`: *Indicadores Brutos e Taxa por 100 Mil Habitantes*
     - `.03 Longevidade`: *Fosso na Expectativa de Vida ao Nascer (IBGE)*
     - `.04 Suicídio`: *Prevenção e Mortalidade por Suicídio Masculino (MS/SIM)*
     - `.05 Causas`: *Desagregação Epidemiológica por Causas de Morte*
     - `.07 Ajuda`: *Canais de Suporte Emocional e Rede CAPS/SUS*
2. **Atributos Microdata Semantic HTML5**:
   - Inclusão de `<article>`, `<section>`, `<aside>` e atributos `itemscope` / `itemprop`.

---

### Eixo 4: Arquivos de Descoberta (`sitemap.xml` & `robots.txt`)

#### 4.1 `public/robots.txt`
```txt
User-agent: *
Allow: /
Sitemap: https://vidasmasculinas.vercel.app/sitemap.xml

# AI & LLM Crawlers Allowed
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
```

#### 4.2 `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vidasmasculinas.vercel.app/</loc>
    <lastmod>2026-07-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 📋 Lista de Verificação de Implementação (Fase Futura)

- [ ] Criar `public/llms.txt` e `public/llms-full.txt`.
- [ ] Criar `public/robots.txt` e `public/sitemap.xml`.
- [ ] Atualizar o JSON-LD em `index.html` com o Grafo de Entidades (`Dataset` + `MedicalWebPage`).
- [ ] Validar no Google Rich Results Test e no Schema Markup Validator.
