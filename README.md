
# HotelHub API

Este projeto é uma API backend para um site que publica todas as informações sobre hotéis. A API permitirá a criação, leitura, atualização e exclusão (CRUD) de dados de hotéis, além de fornecer funcionalidades de filtragem avançada por diversos critérios.

## Funcionalidades Principais
* CRUD de contas de usuário, endereços, condições, facilidades, galerias, hotéis, notícias, avaliações, slides, esportes, equipe, e tempos de viagem.
* Exibição de fotos, vídeos e comentários de usuários.
* Autenticação e autorização usando JWT.
* Filtragem de hotéis por nome, facilidades, acomodações, tempo de viagem, média de avaliações, esportes disponíveis, quantidade de estrelas, entre outros.
* Integração com Mailchimp para gerenciamento de contatos e envio de emails.
## Detalhes Técnicos
### Linguagem de Programação e Framework:
Linguagem: NodeJS

Framework: NestJS

### Banco de Dados:

Tipo: PostgreSQL

ORM: Prisma

### Autenticação e Autorização:

Método de Autenticação: JWT

#### Regras de Autorização:
Rotas de leitura (exceto de usuário) são públicas.

Rotas de criação, deleção e atualização de informações são restritas a usuários autenticados.

Criação de usuário é restrita ao administrador.

### Infraestrutura:

Containerização: Docker (Dockerfile disponível para rodar localmente).

Deploy: Render

### Testes:

Testes em desenvolvimento.
## Endpoints e Rotas
* **/account:** CRUD de accounts
* **/address:** CRUD de address, incluindo **/address/city** e **/address/country**
* **/auth/login:** Gerenciamento de login e autenticação de usuários
* **/condition:** CRUD de condition
* **/facility:** CRUD de facility
* **/gallery:** CRUD de gallery
* **/hotel:** CRUD de hotel
* **/mailchimp:** Integração com Mailchimp para gerenciamento de contatos e envio de emails
* **/news:** CRUD de news
* **/rating:** CRUD de rating
* **/slider:** CRUD de slides do site
* **/sport:** CRUD de sports
* **/team:** CRUD de equipe dos hotéis (fotos, cargos, localização)
* **/travel-time:** CRUD de travel time
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env


`PORT`
`DATABASE_URL`
`JWT_SECRET`

`AWS_S3_ENDPOINT`
`AWS_ACCESS_KEY_ID`
`AWS_SECRET_ACCESS_KEY`
`AWS_REGION`
`AWS_S3_BUCKET_NAME`

`MAILCHIMP_URL`
`API_KEY_MAILCHIMP`
## Instalação

Instale dependencias com npm

```bash
  npm install
```

Faça a migração do banco de dados
```bash
  npx prisma migrate dev
```

Rode a aplicação
```bash
  npm run start
```

Acesse a aplicação em: http://localhost:${PORT} (Substitua "PORT" pela porta configurada na variável de ambiente port colocado em seu .env)