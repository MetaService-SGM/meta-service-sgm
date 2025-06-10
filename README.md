# 🏭 Meta Service SGM

**Meta Service SGM** é um Sistema de Gerenciamento de Manutenção Industrial, projetado para auxiliar empresas no controle de ordens de serviço, agendamento de manutenções preventivas, controle de equipamentos e indicadores de desempenho (KPIs).

---

## 🧱 Estrutura do Projeto

```bash
meta-service-sgm/
│
├── frontend/    # Interface web
└── backend/     # API e lógica de negócios
```

🚀 Tecnologias Utilizadas

#### Front-end
  - Next.js com TypeScript

  - React

  - Tailwind CSS

  - Axios

#### Back-end
  - Ruby on Rails ~> 7.1.3

  - Ruby 3.2.3

  - PostgreSQL

  - Puma (servidor web)

  - Devise e Devise Token Auth (autenticação)

  - Pundit (autorização)

  - Active Storage + Validations (upload de arquivos)

  - Sidekiq (jobs em background)

  - Ransack (filtros e buscas)

  - CPF_CNPJ (validação de documentos)

  - JSONAPI::Serializer (serialização de JSON)

  - Whenever (agendamento de tarefas)

  - RSpec, FactoryBot, Faker, Shoulda-Matchers (testes)

  - Rswag (documentação da API)

  - Dotenv (variáveis de ambiente)

  - Rubocop (linter)

🛠️ Como Rodar o Projeto Localmente
Pré-requisitos
  - Node.js (v18+)

  - Ruby (3.2.3)

  - PostgreSQL

  - Bundler (gem install bundler)

  - Redis (para Sidekiq)

  - Git

  - npm ou yarn

📦 Instalando dependências
### Frontend
```bash
cd frontend
npm install
```
### Backend
```bash
cd backend
bundle install
cp .env                 # Crie o arquivo de variáveis de ambiente
rails db:setup          # Cria, migra e popula o banco
```
▶️ Rodando os servidores
### Frontend
```bash
cd frontend
npm run dev
```
### Backend
```bash
cd backend
rails s
```
Para Sidekiq, use bundle exec sidekiq (lembrando que o Redis precisa estar rodando)

✅ Testes
```bash
cd backend
bundle exec rspec
```
📌 Git Flow
Este projeto segue o fluxo de trabalho Git Flow:

main: produção

develop: desenvolvimento

feature/*: novas funcionalidades

release/*: preparação de versão

hotfix/*: correções em produção
