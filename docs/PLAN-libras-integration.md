# PLAN-libras-integration.md — Plano de Integração de Acessibilidade em LIBRAS

> **Objetivo:** Estabelecer a arquitetura, alternativas técnicas e o roteiro de implementação para integrar a tradução automática em Língua Brasileira de Sinais (LIBRAS) no projeto **Vidas Masculinas**, viabilizando o suporte avançado ao Critério WCAG 2.2 AAA (1.2.6).

---

## 1. Opções Técnicas de Integração

Existem duas abordagens principais para adicionar suporte a LIBRAS no Brasil:

### Opção A: Widget Oficial Governo Federal / Suíte VLibras (Recomendado)
- **O que é:** Ferramenta open-source desenvolvida pelo Governo Federal do Brasil (Ministério da Gestão e da Inovação / LVID / UFPB) que traduz automaticamente textos em português para LIBRAS utilizando um avatar 3D interativo (3D Avatar 3D - "Ícaro", "Hozana" ou "Guga").
- **Vantagens:**
  - Gratuito, oficial e amplamente reconhecido no Brasil.
  - Tradução em tempo real de qualquer texto dinâmico (incluindo contadores, FAQ e metodologia).
  - Script leve injetável via Web Component / Script async sem impactar a inicialização principal.
- **Trade-offs:** Depende da CDN do Governo Federal (`vlibras.gov.br`).

### Opção B: Tradução em Vídeo Humano / Gravada
- **O que é:** Gravação de vídeos em estúdio com intérpretes humanos de LIBRAS para cada seção e pergunta do FAQ.
- **Vantagens:** Fidelidade linguística máxima (expressão facial e regionalismos).
- **Trade-offs:** Inviável para dados dinâmicos em tempo real (como o contador numérico de segundos), alto custo de produção e manutenção.

---

## 2. Roteiro de Implementação da Opção A (VLibras)

### Fase 1: Injeção do Widget no HTML (`index.html`)
Inserir a estrutura oficial do VLibras logo antes do fechamento do `</body>`:

```html
<!-- Widget Oficial VLibras (Governo Federal) -->
<div vw class="enabled">
  <div vw-access-button class="active"></div>
  <div vw-plugin-wrapper>
    <div class="vw-plugin-top-wrapper"></div>
  </div>
</div>
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
<script>
  new window.VLibras.Widget('https://vlibras.gov.br/app');
</script>
```

### Fase 2: Componentização React (`src/components/VLibrasWidget.tsx`)
Para seguir as boas práticas do React 19 e TypeScript no projeto, encapsular o widget em um componente isolado:

```tsx
import { useEffect } from 'react';

export function VLibrasWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      // @ts-expect-error VLibras global init
      if (window.VLibras) {
        // @ts-expect-error VLibras global init
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div vw="true" className="enabled z-50">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
```

### Fase 3: Validação de Layout & WCAG
- [ ] Garantir que o botão do VLibras não sobreponha botões de UI no mobile (como o botão de tema ou menu).
- [ ] Testar a leitura de termos técnicos ("DATASUS", "SIM", "homicídios", "longevidade").

---

## 3. Conclusão e Entregáveis

- **Arquivo de Plano:** `docs/PLAN-libras-integration.md`
- **Próximos Passos:** Quando autorizado, executar a inclusão do componente `VLibrasWidget.tsx` para ativar a tradução automática em LIBRAS.
