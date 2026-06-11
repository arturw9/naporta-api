# 📦 Naporta API - Gerenciar pedidos realizados

API desenvolvida em **NestJS**, com **Prisma ORM**, **PostgreSQL** via Docker, autenticação **JWT** e testes E2E com **Jest**.

---

## 🎁 Bônus

- **Clean Code** 
- **Testes automatizados**
- **Docker**
- **Linter**

---

## 🚀 Tecnologias

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker / Docker Compose
- JWT Authentication
- Jest + Supertest (E2E)
- Swagger

---

## ⚙️ Pré-requisitos

- Node.js >= 18
- Docker
- Docker Compose
- npm ou yarn

---

## 🐳 1. Subir o banco de dados

Na raiz do projeto:

```bash
docker compose up -d
```

Verificar se está rodando:

```bash
docker ps
```

---

## 📦 2. Instalar dependências

```bash
npm install
```

---

## 🧬 3. Configurar banco de dados (Prisma)

Rodar migrations:

```bash
npx prisma migrate dev
```

Gerar client:

```bash
npx prisma generate
```

---

## 🌱 4. Popular banco com dados iniciais (SEED)

Esse projeto possui um script de seed para criar usuários e pedidos fictícios.

Rodar seed:

```bash
npx prisma db seed
```

### O que o seed cria:

**👤 Usuários**
- Admin (`admin@naporta.com`)
- Carlos Mendes
- Mariana Souza

**📦 Pedidos**
- PED-001
- PED-002
- PED-003
- PED-004

com itens, preços e clientes fictícios.

---

## 🔐 5. Variáveis de ambiente

Criar arquivo `.env`:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/naporta"
JWT_SECRET="sua_chave_secreta"
```

---

## 🚀 6. Rodar a API

```bash
npm run start:dev
```

API disponível em: `http://localhost:3000`

---

## 📚 Swagger

Documentação disponível em: `http://localhost:3000/api`

---

## 🔐 Autenticação

Todas as rotas protegidas usam Authorization Bearer <token>:

```
No Swagger clicar no campo 'Authorize' e inserir somente o token obtido no endpoint 'Auth'.
```

**Login:**

```
POST /api/auth/login
```

Exemplo de body:

```json
{
  "email": "admin@naporta.com",
  "password": "123456"
}
```

---

## 🧪 7. Rodar testes E2E

Certifique-se de que o banco está rodando:

```bash
docker compose up -d
```

Executar testes:

```bash
npm run test:e2e
```

---

## 📜 Scripts disponíveis

```json
{
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main",
  "build": "nest build",
  "test": "jest",
  "test:e2e": "jest --config ./test/jest-e2e.json",
  "test:watch": "jest --watch"
}
```

---

## 🐳 Docker

Subir containers:

```bash
docker compose up -d
```

Parar containers:

```bash
docker compose down
```

Reset completo:

```bash
docker compose down -v
docker compose up -d --build
```

---

## 🔁 Fluxo completo de execução

```bash
docker compose up -d
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

---

## 🧪 Testes

Os testes E2E:

- Sobem a aplicação NestJS real
- Usam banco real via Docker
- Validam autenticação JWT
- Testam CRUD de orders

---

## ⚠️ Observações importantes

- Banco roda via Docker (PostgreSQL)
- Prisma é responsável pelas migrations
- Seed popula dados iniciais automaticamente
- JWT é obrigatório em rotas protegidas
- Swagger disponível em `/api`
- `OrderNumber` deve ser único

---

## 🧹 Troubleshooting

**Porta ocupada:**

```bash
netstat -ano | findstr :3000
```

**Reset banco:**

```bash
npx prisma migrate reset
```

**Limpar Docker:**

```bash
docker system prune -a
```

**Erro de seed duplicado** — se ocorrer conflito:

```bash
npx prisma migrate reset
npx prisma db seed
```

---

## 🎯 Estrutura do projeto

```
src/
├── auth/
├── orders/
├── users/
├── prisma/
└── main.ts

prisma/
├── schema.prisma
└── seed.ts

test/
└── orders.e2e-spec.ts
```
