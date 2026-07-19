# Plano de Sistema de Frases Aleatórias no Contador da Hero

Este plano descreve o design e as etapas para implementar um sistema de frases aleatórias para o contador secundário na Hero (quando no modo relógio/estatística geral), substituindo o texto fixo atual por templates dinâmicos.

---

## 1. Objetivo

Substituir o texto fixo:
> *"Hoje, [número] homens morreram no Brasil desde 01/01/2026."*

Por uma variação dinâmica baseada em templates pré-definidos:
> *"[Início da frase], [número] homens morreram no Brasil desde 01/01/2026 [Fim da frase]"*

Garantindo que o valor dinâmico de mortes (`formatDeathCount(deaths)`) e a data âncora (`EPOCH_LABEL`) sejam mantidos perfeitamente integrados na renderização do React.

---

## 2. Abordagem de Design

### Criação dos Templates de Frase
Definiremos um array de funções (ou objetos de template) que aceitam os parâmetros de mortes e data âncora, para que possamos selecionar uma frase aleatoriamente na montagem do componente.

Exemplo de estrutura de dados (com teor melancólico e solene):
```typescript
const COUNTER_PHRASES = [
  (deaths: React.ReactNode, date: string) => (
    <>
      Até aqui, {deaths} homens morreram no Brasil desde {date} por causas diversas.
    </>
  ),
  (deaths: React.ReactNode, date: string) => (
    <>
      O silêncio engoliu {deaths} vidas masculinas no Brasil desde {date} por causas diversas.
    </>
  ),
  (deaths: React.ReactNode, date: string) => (
    <>
      Desde {date}, {deaths} homens tiveram suas histórias e sonhos interrompidos por causas diversas.
    </>
  ),
  (deaths: React.ReactNode, date: string) => (
    <>
      Já se foram {deaths} pais, filhos e irmãos no Brasil desde {date} por causas diversas.
    </>
  ),
  (deaths: React.ReactNode, date: string) => (
    <>
      A triste marca de {deaths} vidas masculinas ceifadas foi alcançada desde {date} por causas diversas.
    </>
  )
];
```

### Seleção Aleatória Estável
Para evitar que a frase mude freneticamente a cada re-renderização (tique do contador), a frase será selecionada **apenas uma vez** quando o componente for montado no navegador (usando um `useMemo` com array de dependências vazio, ou um estado inicial persistente durante a sessão da página).

---

## 3. Plano de Ação

- [ ] **Fase 1:** Definir o array de templates de frases no componente `Hero.tsx`.
- [ ] **Fase 2:** Criar uma referência estável ou `useMemo` na inicialização do componente para selecionar o índice da frase que será exibida durante a sessão do usuário.
- [ ] **Fase 3:** Atualizar a renderização sob a verificação `isClockMode` no JSX do `Hero.tsx` para executar o template de frase selecionado aleatoriamente.
- [ ] **Fase 4:** Testar o build e verificar a estabilidade do counter dentro da frase selecionada.
