# Task Management App with Express

Este é um API construída com **Node.js**, **Typescript**, **Express**, **Prisma**, **Swagger** e **JWT** para gerenciamento de tarefas.

## Entidades

### User

- Atributos: ID, email, name, password, weight.

### Tarefa

- Atributos: ID, title, description, priority, status, conclusion, category_id, user_id.

### Categoria

- Atributos: ID, name, color

## Inicialização

1. Configure seu ambiente criando um arquivo `.env` (você pode copiar o conteúdo de `.env.example` e colá-lo no novo arquivo).
2. Certifique-se de que o Docker está em execução e execute `npm run setup` no terminal.
3. Para iniciar a aplicação, execute `npm run start`.

## Rotas

### Autenticação (Auth)

- **POST /signin**

  - Rota de Login
  - Retorna um token de acesso (**access_token**) que deve ser passado no cabeçalho da requisição:
    ```
    Authorization: Bearer ${access_token}
    ```
  - Se estiver utilizando o Swagger, você pode colar o `access_token` no campo **Authorize**, localizado no canto superior direito da interface.

- **POST /signup**
  - Rota de Cadastro
  - Retorna o usuário cadastrado, juntamente com o access_token.

### Usuários (Users)

- **GET /users**

  - Retorna todos os usuários.

- **GET /users/id**

  - Retorna usuário por ID.
  - Possui QueryParams opcionais:
    - **TASK_QUANTITY**: Quantidade de tarefas do usuário.
    - **OLDEST_TASK**: Tarefa mais antiga de um usuário (CreatedAt).
    - **MOST_RECENT_TASK**: Tarefa mais recente de um usuário (CreatedAt).

- **PATCH /users/id**

  - Atualiza um usuário por ID.

- **DELETE /users/id**
  - Deleta um usuário por ID.

### Tarefas (Tasks)

- **POST /tasks**

  - Cria uma nova tarefa.

- **GET /tasks**

  - Retorna todas as tarefas.
  - Possui QueryParams opcionais:
    - **status**: Retorna tarefas por status (_PENDING, DOING, DONE_).
    - **user_id**: Retorna tarefas com _user_id_.
    - **category_id**: Retorna tarefas com _category_id_.
    - **startConclusionDate**: Retorna tarefas com período de conclusão entre _startConclusionDate_ e _endConclusionDate_.
    - **endConclusionDate**: Retorna tarefas com período de conclusão entre _startConclusionDate_ e _endConclusionDate_.

- **GET /tasks/longest-description**

  - Retorna a tarefa com a maior descrição.

- **GET /tasks/average-conclusion**

  - Retorna a média de conclusão das tarefas.

- **GET /tasks/id**

  - Retorna uma tarefa por ID.

- **PATCH /tasks/id**

  - Atualiza uma tarefa por ID.

- **DELETE /tasks/id**
  - Deleta uma tarefa por ID.

### Categoria (Category)

- **POST /category**

  - Cria uma nova categoria.

- **GET /category**

  - Retorna todas as categorias.
  - Possui QueryParams opcionais:
    - **tasks**: Retorna categorias com suas tarefas associadas.

- **GET /category/id**

  - Retorna uma categoria por ID.

- **PATCH /category/id**

  - Atualiza uma categoria por ID.

- **DELETE /category/id**
  - Deleta uma categoria por ID.
