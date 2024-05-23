# Task Management App with Express

Este é um API construída com **Node.js**, **Typescript**, **Express**, **Prisma**, **Swagger** e **JWT** para gerenciamento de tarefas.

## Entidades

### Tarefa

- Atributos: ID, title, description.

## Inicialização

1. Configure seu ambiente criando um arquivo `.env` (você pode copiar o conteúdo de `.env.example` e colá-lo no novo arquivo).
2. Certifique-se de que o Docker está em execução e execute `npm run setup` no terminal.
3. Para iniciar a aplicação, execute `npm run start`.

## Rotas

### Tarefas (Tasks)

- **POST /tasks**

  - Cria uma nova tarefa.

- **GET /tasks**

  - Retorna todas as tarefas.
  - Possui QueryParams opcionais:
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
