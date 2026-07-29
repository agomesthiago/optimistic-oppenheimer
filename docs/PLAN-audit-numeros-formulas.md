# Plano de Auditoria e Ajustes Matemáticos — Vidas Masculinas

## 1. Visão Geral & Objetivos
Auditoria completa de todos os números, fórmulas, proporções e projeções temporais expostos na plataforma **Vidas Masculinas**, alinhando inconsistências entre dados históricos (SIM/DATASUS e IBGE) e calculadoras em tempo real.

---

## 2. Diagnóstico das Inconsistências Matemáticas

### 2.1 Inconsistência na Estimativa Anual de Causas vs. Projeção Dinâmica (`CAUSE_BREAKDOWN`)
* **Problema**: O array `CAUSE_BREAKDOWN` em `src/utils/mortality.ts` define `proportion` (ex: 25,4% para cardiovasculares) e `annualEstimate` (ex: 210.181).
* **Origem da falha**: O valor `210.181` foi calculado multiplicando 25,4% pela mortalidade de 2022 isolada (828.000), enquanto o contador e a função `getCauseDeaths()` utilizam a média de 3 anos `TOTAL_MALE_DEATHS_PER_YEAR` (780.667 mortes/ano).
* **Impacto no Usuário**: No final de 1 ano completo, a contagem na tela principal da causa mostrará 198.289 óbitos cardiovasculares (`780.667 * 0,254`), porém o rodapé do mesmo card afirmará `~210.181 mortes/ano`.
* **Solução**: Tornar `annualEstimate` uma propriedade computada dinamicamente com base em `TOTAL_MALE_DEATHS_PER_YEAR * proportion` ou padronizar a exibição para refletir a mesma base epidemiológica.

### 2.2 Descompasso na Taxa de Suicídios entre Modos da Aplicação
* **Problema**: 
  * O modo Suicídio no `Hero.tsx` calcula mortes com base em `SUICIDE_DATA.male2021` (12.064 óbitos/ano → `33/dia`).
  * O card de causa Suicídio no `CauseTicker.tsx` usa `proportion: 0.016` (1,6% de 780.667 = `12.491/ano`) e exibe `annualEstimate: 13.356` (1,6% de 828.000).
  * O FAQ (item 13) menciona `33 a 36 homens/dia`.
* **Solução**: Unificar a taxa base de suicídios masculinos para que todos os componentes (Hero, CauseTicker, FAQ) utilizem exatamente a mesma constante derivada de `mortality.ts`.

### 2.3 Inconsistência de Precisão na API Estática (`mortality-stats.json`)
* **Problema**: Em `public/data/mortality-stats.json`, o campo `deaths_per_second` é `0.024739502` e `seconds_per_death` é `40.4211846`. No entanto, em `mortality.ts`, `780.667 / 31.557.600` gera `0.024737844...` e `seconds_per_death = 40.424286...`.
* **Solução**: Recalcular ou gerar automaticamente o JSON a partir das constantes exportadas por `mortality.ts`.

### 2.4 Data Hardcoded em `CauseTicker.tsx`
* **Problema**: Em `CauseTicker.tsx` (linha 122), o texto exibe hardcoded `desde 01/01/2026`, ignorando a função `getCounterStartDate()`.
* **Solução**: Substituir a string estática pela data dinâmica formatada vinda de `getCounterStartDate()`.

---

## 3. Matriz de Fórmulas e Constantes Auditadas

| Indicador | Fonte / Fórmula | Valor Exato Auditado | Exibição Atual | Status |
|---|---|---|---|---|
| Média Anual Óbitos Masculinos | `Math.round((828k + 785k + 729k) / 3)` | 780.667 | ~780k-800k | 🟢 Correto |
| Segundos por Ano Astronômico | `365.25 * 24 * 60 * 60` | 31.557.600 s | 31.557.600 s | 🟢 Correto |
| Mortes masculinas por segundo | `780.667 / 31.557.600` | 0.0247378444... | 0,02474 /s | 🟡 Inconsistente no JSON |
| Intervalo entre mortes | `1 / DEATHS_PER_SECOND` | 40,42428 s | ~40 segundos | 🟢 Correto |
| Mortes por dia | `Math.round(DEATHS_PER_SECOND * 86.400)` | 2.137,35 → 2.137 | ≈ 2.137 /dia | 🟢 Correto |
| Expectativa de Vida (H vs M) | IBGE 2022 (72,0 H vs 79,0 M) | Gap = 7,0 anos | 7,0 anos a menos | 🟢 Correto |
| Proporção Suicídio Homens | `12.064 / 15.507` | 77,797% | 77,8% | 🟢 Correto |
| Razão Suicídio Homem:Mulher | `12.064 / 3.443` | 3,5039 : 1 | 3,5 : 1 | 🟢 Correto |
| Doenças Cardiovasculares | 25,4% das mortes | 198.289 (média) vs 210.181 (2022) | 210.181 /ano | 🔴 Divergente |
| Câncer | 15,7% das mortes | 122.565 (média) vs 130.000 (2022) | 130.000 /ano | 🔴 Divergente |

---

## 4. Plano de Ação em Etapas

### Etapa 1: Refatorar `src/utils/mortality.ts`
1. Automatizar o cálculo de `annualEstimate` em `CAUSE_BREAKDOWN` para ser derivado diretamente de `TOTAL_MALE_DEATHS_PER_YEAR * proportion`.
2. Exportar um helper de consistência para estimativas de suicídio diário e anual.

### Etapa 2: Atualizar Componentes Visuais
1. **`CauseTicker.tsx`**: Usar a data dinâmica `getCounterStartDate().toLocaleDateString('pt-BR')` e exibir estimativas de causa alinhadas à base de dados de 780.667 óbitos/ano.
2. **`faq.ts`**: Atualizar os textos do FAQ 06, 07, 08 e 13 para refletir as faixas numéricas de forma harmonizada.

### Etapa 3: Sincronizar `mortality-stats.json`
1. Atualizar o arquivo estático `public/data/mortality-stats.json` com os exatos valores calculados por `mortality.ts`.

---

## 5. Plano de Validação
* **Testes Automatizados/Unitários**: Criar/executar verificação matemática das constantes em `mortality.ts` garantindo que:
  * `sum(proportions) <= 1.0`
  * `annualEstimate == Math.round(TOTAL_MALE_DEATHS_PER_YEAR * proportion)`
  * `DEATHS_PER_DAY * 365.25 ≈ TOTAL_MALE_DEATHS_PER_YEAR`
