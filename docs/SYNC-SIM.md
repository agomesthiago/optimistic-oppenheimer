# Sincronização com o Sistema de Informações sobre Mortalidade (SIM/DATASUS)

Este documento explica como configurar e executar a integração automatizada com o banco de dados oficial do SIM disponibilizado no ElasticSearch da Plataforma de Ciência de Dados Aplicada à Saúde (PCDaS/Fiocruz).

---

## 1. Configurando Credenciais

Para acessar a base de dados do SIM, é necessário possuir uma conta ativa na plataforma PCDaS.

1. Crie o arquivo `.env` na raiz do projeto copiando o modelo `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Insira o seu login e senha do portal PCDaS:
   ```env
   PCDAS_ELASTIC_USER=seu_usuario_cadastrado
   PCDAS_ELASTIC_PASSWORD=sua_senha_secreta
   ```

---

## 2. Rodando a Sincronização

A sincronização coleta os dados via chamadas HTTP agregadas ao ElasticSearch e atualiza o arquivo local `src/data/sim-mortality-data.json`.

Para rodar a sincronização manualmente:
```bash
npx tsx scripts/sync-sim-mortality.ts
```

Se as credenciais não estiverem no `.env`, o script emitirá um aviso no console e manterá o banco de dados local existente sem quebrar a execução ou o build.

---

## 3. Mecanismo de Fallback e Resiliência

Para garantir que a plataforma **Vidas Masculinas** continue no ar e buildando mesmo se os servidores da Fiocruz ficarem offline ou as credenciais expirarem, implementamos o seguinte fluxo:
1. **Fallback em Build/Sincronização:** Se o script de sincronização falhar (timeout, erro 401, erro de rede), ele intercepta o erro graciosamente, grava um log descritivo no terminal e mantém o arquivo JSON local existente. Se o JSON não existir na primeira execução, ele inicializa um arquivo padrão com os dados históricos consolidados de 2019, 2022 e 2023.
2. **Fallback no Frontend:** O arquivo [mortality.ts](file:///C:/Users/thiag/Documents/antigravity/optimistic-oppenheimer/src/utils/mortality.ts) importa o JSON local de forma estática. Caso o arquivo JSON esteja ausente ou corrompido em tempo de execução, o código reverte automaticamente para constantes estáticas auditadas e seguras.

---

## 4. Calibração e Mapeamento de Campos

Se a Fiocruz atualizar as variáveis ou o mapeamento do índice `datasus-sim`, os campos podem ser facilmente recalibrados no seu arquivo `.env` sem a necessidade de reescrever código JavaScript/TypeScript:

* **Mapeamento de Sexo:**
  - `PCDAS_FIELD_SEXO` (Padrão: `def_sexo`): Campo que indica o sexo do falecido.
  - `PCDAS_VALUE_SEXO_MALE` (Padrão: `Masculino`): Valor associado ao sexo masculino.
* **Mapeamento de Tempo:**
  - `PCDAS_FIELD_ANO` (Padrão: `ano_obito`): Campo usado para agrupar as mortes por ano.
* **Mapeamento de CIDs:**
  - `PCDAS_FIELD_CID` (Padrão: `causabas`): Campo que armazena o código CID-10 da causa básica de óbito.
