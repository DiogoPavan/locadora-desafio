# Locadora - Desafio

Desafio 4all feito em [Node.js](#https://nodejs.org/)

# Banco de dados

O script para gerar e popular as tabelas está localizado no seguinte caminho: `src/database/locadoradb.sql`

# Endpoints

Lista dos endpoints disponíveis na aplicação.

## **USUÁRIO**

Endpoints referentes aos usuário.

### **POST /users**

Realiza o cadastro de novos usuários.

**Body**

- nome: `string`
- email: `string`
- password: `string`

**Retorno API**

```javascript
{
  "message": "Usuário cadastrado com sucesso",
  "status": "OK",
  "data": {
    "idUser": 1,
    "nome": "Nome do usuário",
    "email": "email_usuario@provedor.com"
  }
}
```

## **AUTH**

Endpoints para autenticação e logoff da aplicação.

### **POST /auth/login**

Realiza o login na aplicação.

**Body**

- email: `string`
- password: `string`

**Retorno API**

```javascript
{
  "message": "Login realizado com sucesso",
  "status": "OK",
  "data": {
    "idUser": 1,
    "nome": "Nome do usuário",
    "token": "TOKEN_GERADO_PELA_APLICACAO"
  }
}
```

### **POST /auth/logoff**

Realiza o logoff da aplicação.

**Header**

- Authorization: Incluir o Bearer token, exemplo: **Bearer** TOKEN_GERADO_PELA_APLICACAO_NO_LOGIN

**Retorno API**

```javascript
{
  "message": "Logoff realizado com sucesso",
  "status": "OK"
}
```

## **FILMES**

Endpoints relacionados aos filmes.

### **GET /filmes**

Busca os filmes da aplicação.

**Header**

- Authorization: Incluir o Bearer token, exemplo: **Bearer** TOKEN_GERADO_PELA_APLICACAO_NO_LOGIN

**Query**

- disponivel (opcional): boolean. Se não for informado, buscará todos os filmes da aplicação, indiferente se está disponível ou não. Se for `true` irá busca apenas os filmes que estão disponíveis para locação. Se for `false` irá buscar os filmes que não estão disponíveis para locação.
- titulo (opcional): string. Buscará os filmes pelo título.

**Retorno API**

```javascript
{
  "status": "OK",
  "data": [{
    "idFilme": 1,
    "titulo": "Nome do Filme",
    "diretor": "Diretor do Filme",
    "copias": 5,
    "alocados": 3
  }, {
    "idFilme": 2,
    "titulo": "Nome do Filme 2",
    "diretor": "Diretor do Filme 2",
    "copias": 3,
    "alocados": 3
  },
  {
    "idFilme": 3,
    "titulo": "Nome do Filme 3",
    "diretor": "Diretor do Filme 3",
    "copias": 4,
    "alocados": 0
  }]
}
```

### **POST /filmes/alugar**

Alugar determinado filme.

**Header**

- Authorization: Incluir o Bearer token, exemplo: **Bearer** TOKEN_GERADO_PELA_APLICACAO_NO_LOGIN

**Body**

- idFilme: `number` (inteiro)

**Retorno API**

```javascript
{
  "message": "Filme alugado com sucesso",
  "status": "OK",
  "data": {
    "idFilme": 1,
    "titulo": "Nome do Filme",
    "diretor": "Diretor do Filme",
    "copias": 1
  }
}
```

### **POST /filmes/devolver**

Devolver filme alugado.

**Header**

- Authorization: Incluir o Bearer token, exemplo: **Bearer** TOKEN_GERADO_PELA_APLICACAO_NO_LOGIN

**Body**

- idFilme: `number` (inteiro)

**Retorno API**

```javascript
{
  "message": "Filme devolvido com sucesso",
  "status": "OK"
}
```
