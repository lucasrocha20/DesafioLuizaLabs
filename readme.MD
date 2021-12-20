# Desafio Técnico - LuizaLabs/Magalu
Esta documentação descreve a estrutura e execução da API de produtos favoritos para o desafios técnicos.

## Requisitos
  - Docker
  - Docker composer

## Iniciando o projeto

Na raiz do projeto executar os seguintes comandos

  `docker-compose up`

  Com o projeto rodando pela primeira vez, é necessário executar as migrations para criação de tabelas no banco com o seguinte comando:

  `yarn typeorm migration:run` ou `npm run typeorm migration:run`

## Rotas de API
### Usuário

Estrutura de usuário

- `id`: id do usuário
- `name`: Nome do usuário
- `email`: Email do usuário
- `password`: Password criptografado do usuário

#### Criação

URL (POST): `http://localhost:3333/users`

Informações de body

- `name`: Nome
- `email`: Email
- `password`: Password

### Autenticação

URL (POST): `http://localhost:3333/sessions`

Informações de body

- `email`: Email
- `password`: Password

### Cliente (TOKEN DE AUTENTICAÇÃO OBRIGATÓRIO)

Estrutura de cliente

- `id`: id do cliente
- `name`: Nome do cliente
- `email`: Email do cliente
- `favoriteProducts`: Produtos favoritos do cliente

#### Listagem

`<PAGINA>` representa o número da página requisitada, iniciando em `1` como default.
`<QTDEPAGINA>` representa o número da página requisitada, caso não seja informado `10` será o valor default.

URL (GET): `http://localhost:3333/clients?page=<PAGINA>&perPage=<QTDEPAGINA>`

#### Listagem por ID

`<CLIENTID>` Representa o ID do cliente a ser buscado.

URL (GET): `http://localhost:3333/clients/<CLIENTID>`

#### Criação

URL (POST): `http://localhost:3333/clients`

Informações de body

- `name`: Nome do cliente
- `email`: Email do cliente

#### Atualização

`<CLIENTID>` Representa o ID do cliente a ser atualizado.

URL (PUT): `http://localhost:3333/clients/<CLIENTID>`

Informações de body

- `name`: Nome do cliente
- `email`: Email do cliente (Opcional)

#### Remoção

`<CLIENTID>` Representa o ID do cliente a ser deletado.

URL (DELETE): `http://localhost:3333/clients/<CLIENTID>`


### Produtos Favorito (TOKEN DE AUTENTICAÇÃO OBRIGATÓRIO)

Estrutura de produtos favorito

- `id`: id do produto favorito
- `clientid`: id do produto favorito
- `productid`: id do produto favorito

#### Listagem por ID do Cliente

`<CLIENTID>` Representa o ID do cliente a ser deletado.

URL (GET): `http://localhost:3333/favoriteProducts/<CLIENTID>`

#### Criação

URL (POST): `http://localhost:3333/favoriteProducts`

Informações de body

- `clientid`: Id do cliente
- `productid`: Id do produto

#### Remoção

`<CLIENTID>` Representa o ID do cliente.
`<PRODUCTID>` Representa o ID do produto favorito a ser deletado.

URL (DELETE): `http://localhost:3333/clients/<CLIENTID>/<PRODUCTID>`
