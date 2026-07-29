# PLAN-wcag-aaa.md — Plano de Viabilidade e Roteiro de Acessibilidade WCAG 2.2 Nível AAA

> **Objetivo:** Avaliar a viabilidade técnica, os requisitos normativos, os trade-offs de design/conteúdo e estabelecer o roteiro de adaptação para atingir o Nível AAA da WCAG 2.2 no projeto **Vidas Masculinas**.

---

## 1. O que é o Nível AAA e como ele se compara ao Nível AA?

A norma **WCAG 2.2** possui três níveis graduais de conformidade:
- **Nível A (Mínimo):** Requisitos essenciais de infraestrutura e semântica.
- **Nível AA (Padrão de Mercado & Legal):** Exigido por legislações mundiais (LBI nº 13.146/2015 no Brasil, ADA nos EUA e EN 301 549 na UE).
- **Nível AAA (Conformidade Máxima):** O nível mais alto de acessibilidade da W3C.

### Aviso da W3C sobre o Nível AAA
A própria documentação oficial da W3C estabelece que **não é recomendado exigir conformidade AAA para um site inteiro**, porque determinados tipos de conteúdo (como gráficos interativos ou textos técnicos) não conseguem satisfazer todos os critérios AAA sem alterar a própria natureza da aplicação.

---

## 2. Análise de Viabilidade por Requisito WCAG AAA no Projeto

| Critério WCAG 2.2 AAA | Requisito Normativo | Viabilidade no Projeto | Impacto & Ação Recomendada |
| :--- | :--- | :---: | :--- |
| **1.4.6 Contraste Ampliado (AAA)** | Texto normal exige razão mínima de **7.0:1** (em vez de 4.5:1). Texto grande exige **4.5:1** (em vez de 3.0:1). | **Alta (100% Viável)** | **Já alcançado em partes do projeto** (`dark:text-ash-400` tem 7.03:1). Exige auditoria final de todos os textos restantes para elevar o token de contraste. |
| **2.2.3 Sem Tempo Limite (AAA)** | A navegação ou visualização não pode expirar por tempo sob nenhuma hipótese. | **Alta (100% Viável)** | **Já atendido.** O site é um hub de consulta sem *timeout* de sessão, sem formulários expiráveis e sem *auth*. |
| **2.2.4 Interrupções (AAA)** | O usuário pode adiar ou suprimir qualquer alerta ou interrupção. | **Alta (100% Viável)** | **Já atendido.** Não existem pop-ups, modais automáticos ou propagandas. |
| **2.3.2 Três Flashes (AAA)** | Nenhum elemento pode piscar mais de 3 vezes em 1 segundo. | **Alta (100% Viável)** | **Já atendido.** Não há elementos piscantes no site. |
| **3.1.3 Vocabulário / Jargões (AAA)** | Mecanismo para identificar definições específicas de jargões e termos técnicos. | **Média/Alta** | **Viável.** Pode ser atendido expandindo o Glossário Epidemiológico (`GlossarySection.tsx`) e integrando um componente `<abbr>` com tooltip acessível. |
| **3.1.4 Siglas e Abreviações (AAA)** | Mecanismo para identificar o significado expandido de cada sigla (ex: DATASUS, IBGE, INCA, IPEA, SIM). | **Alta (100% Viável)** | **Viável.** Aplicar a tag HTML5 `<abbr title="Sistema de Informações sobre Mortalidade">SIM</abbr>` em cada ocorrência. |
| **1.2.6 Língua de Sinais (AAA)** | Interpretação em Língua de Sinais (LIBRAS) para todo conteúdo em áudio gravado. | **Baixa (Inviável no Momento)** | Exigiria gravação e sincronização de vídeos de intérpretes de LIBRAS para os dados institucionais do hub. |
| **1.2.7 Audiodescrição Estendida (AAA)** | Audiodescrição estendida em vídeo. | **Não Aplicável** | O site não possui conteúdo em vídeo gravado. |

---

## 3. Roteiro de Implementação para Alcançar WCAG AAA (Onde Aplicável)

### Fase 1: Elevação de Contraste de Texto para 7.0:1 (Critério 1.4.6 - AAA)
- [ ] Mapear todas as instâncias de textos secundários no projeto.
- [ ] Promover todos os textos normais para tokens com taxa $\ge 7.0:1$ tanto em Light Mode quanto em Dark Mode.

### Fase 2: Semântica de Siglas e Glossário Reativo (Critérios 3.1.3 & 3.1.4 - AAA)
- [ ] Envelopar todas as siglas governamentais e epidemiológicas (DATASUS, IBGE, INCA, IPEA, SIM, CID-10) em tags `<abbr>` acessíveis.
- [ ] Adicionar suporte a `aria-describedby` para termos técnicos que possuam correspondência no Glossário (.07).

### Fase 3: Identificação de Leitura e Nível de Escrita (Critério 3.1.5 - AAA)
- [ ] Fornecer versão simplificada ou resumo executivo claro (já existente na introdução e metodologia) para garantir compreensão leitora.

---

## 4. Conclusão e Recomendação Arquitetural

É **perfeitamente viável declarar conformidade WCAG 2.2 AA com equivalência AAA nos critérios textuais, de contraste (1.4.6), tempo limite (2.2.3) e semântica de siglas (3.1.4)**. 

A certificação AAA universal não é necessária nem recomendada pela W3C para hubs de dados, mas o projeto pode adotar a classificação **"Conforme WCAG 2.2 Nível AA com Suporte Expandido AAA em Contraste e Semântica"**.
