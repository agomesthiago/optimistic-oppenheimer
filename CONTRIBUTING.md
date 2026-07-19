# Guia de Contribuição (Contributing)

Obrigado pelo seu interesse em contribuir para o **Vidas Masculinas**! Este documento orienta sobre o processo de configuração do ambiente e as convenções que utilizamos neste projeto.

## Como Contribuir

1. **Faça um Fork** do repositório.
2. **Crie uma Branch** para sua modificação: `git checkout -b feature/minha-melhoria` ou `git checkout -b bugfix/correcao-de-bug`.
3. **Faça suas alterações** e siga as regras de código deste repositório.
4. **Valide seu código** localmente antes de enviar:
   ```bash
   npm run lint
   npm run build
   ```
5. **Faça o Commit** seguindo a convenção de [Conventional Commits](https://www.conventionalcommits.org/):
   * Exemplo: `feat: adiciona nova seção de estatísticas` ou `fix: corrige alinhamento do rodapé em telas pequenas`.
6. **Envie um Pull Request** detalhando o que foi feito e os testes realizados.

---

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

Certifique-se de ter instalado:
* **Node.js** (versão 18 ou superior recomendado)
* **npm** (incluso com o Node)

### Passo a Passo

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O projeto estará acessível por padrão em `http://localhost:5173`.

3. Para compilar o projeto para produção:
   ```bash
   npm run build
   ```

4. Para rodar o linter (Oxlint):
   ```bash
   npm run lint
   ```

---

## Diretrizes de Código e Estilo

* **TypeScript**: Todo o código deve ser tipado de forma explícita. Evite o uso de `any`.
* **Componentes**: Mantenha um componente por arquivo dentro de `src/components/`.
* **Mobile-First**: O design deve ser projetado primeiro para telas móveis (larguras de até 480px) e posteriormente expandido para telas maiores.
* **Estilização**: Utilize classes utilitárias do Tailwind CSS de forma semântica e organizada.
* **Animações**: Para animações complexas, consulte ou utilize a biblioteca GSAP já instalada.
