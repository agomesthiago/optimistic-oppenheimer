# Plano de Arquitetura & Espelhamento na Vercel

> **Objetivo**: Preparar e otimizar 100% da estrutura da aplicação **Vidas Masculinas** para espelhamento e implantação de alta performance na plataforma Vercel (Vite + React SPA + Widgets + SEO), garantindo integração instantânea no momento em que a conta Vercel for criada.

---

## 📋 Resumo da Estratégia de Espelhamento

A aplicação **Vidas Masculinas** (Single Page App em React 19 + Vite + Tailwind CSS + GSAP) será configurada com espelhamento duplo (*dual mirror/multi-cloud*). Dessa forma, o projeto estará 100% compatível tanto com a Vercel (provedor primário e sem limite de compilação) quanto com o Netlify.

---

## 🛠️ Fase 1: Ajustes de Infraestrutura no Código (Pré-Deploy)

### 1. Refinamento do `vercel.json`
- **Cabeçalhos de Segurança & CORS**: Garantir `Access-Control-Allow-Origin: *`, `X-Frame-Options: ALLOWALL` e `Content-Security-Policy` para que os widgets possam ser incorporados por sites terceiros.
- **Roteamento SPA (`rewrites`)**: Redirecionar todas as requisições para `/index.html` mantendo compatibilidade com URLs limpas como `/share/:count`.
- **Cache-Control**: Adicionar cabeçalhos de no-cache para o `index.html` prevenindo que usuários vejam versões desatualizadas da aplicação.

### 2. Validação dos Scripts e Build Artifacts
- **Compilação de Aplicação + Widgets**: O comando `npm run build` deve gerar tanto os arquivos principais (`dist/index.html`, `dist/assets/*`) quanto os widgets estáticos (`dist/widgets/embed.js` e `dist/widgets/web-component.js`).

### 3. Atualização da Documentação e Selos
- Adicionar o botão de deploy instantâneo em 1-clique (`Deploy with Vercel`) no `README.md`.

---

## 🚀 Fase 2: Passo a Passo Assim Que a Conta Vercel For Criada

1. **Acesso e Conexão**:
   - Acesse **[vercel.com/new](https://vercel.com/new)** e faça login com sua conta do GitHub.
2. **Importação do Repositório**:
   - Selecione o repositório **`agomesthiago/optimistic-oppenheimer`**.
3. **Parâmetros do Projeto**:
   - **Framework Preset**: `Vite` (detectado automaticamente)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Implantação Inicial**:
   - Clique em **Deploy**. O build de produção leva ~20 segundos.
5. **Configuração de Domínio Personalizado (Opcional)**:
   - Em **Settings ➔ Domains**, adicione seu domínio personalizado (ex.: `vidasmasculinas.com.br` ou `vidasmasculinas.vercel.app`).

---

## 🔍 Fase 3: Lista de Verificação e Testes Pós-Deploy

- [ ] **Home Page & Contadores**: Verificar se o contador em tempo real do Hero e a alternância de modos funcionam perfeitamente.
- [ ] **Seção `.05` (Causas)**: Testar a navegação de slides do carrossel em telas mobile e desktop.
- [ ] **Widgets Incorporáveis**: Testar a carga do widget via script de embed em um ambiente isolado.
- [ ] **SEO & Meta Tags**: Validar o compartilhamento do Open Graph no WhatsApp e Twitter/X.
- [ ] **Headers de Segurança**: Verificar se as respostas HTTP contêm os cabeçalhos de CORS e frame-ancestors.

---

## 🎯 Próximos Passos
1. O plano foi salvo em [`docs/PLAN-vercel-mirror-setup.md`](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/docs/PLAN-vercel-mirror-setup.md).
2. Execute os ajustes no `vercel.json` e `README.md`.
3. Assim que você criar sua conta na Vercel, basta conectar o repositório `agomesthiago/optimistic-oppenheimer` para ativar o deploy automático.
