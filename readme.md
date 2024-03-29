Persistencia do bearer no swagger
melhorar update\*dtos para extender o create
o service chama outros services ou chama outros repositories

Entidades:

- Usuário:
  Atributos: ID, nome de usuário, peso, senha, e-mail.

- Tarefa:
  Atributos: ID, título, descrição, data de criação, data de conclusão, tipo, categoria (opcional), status (pendente, em andamento, concluída), e usuário associado.

- Categoria:
  Atributos: ID, nome, cor (para identificação visual).

Funcionalidades Adicionais utilizando Métodos de Array:

Rota para filtrar tarefas por categoria.
Rota para listar tarefas concluídas.
Rota para listar tarefas pendentes.
Rota para listar tarefas que vencem em um determinado período.
Rota para contar o número total de tarefas de um usuário.
Rota para encontrar a tarefa mais recente de um usuário.

Funcionalidades com Métodos de Array:

Rota para calcular a média de conclusão das tarefas.
Rota para encontrar a tarefa com a descrição mais longa.
Rota para agrupar tarefas por categoria.
Rota para encontrar a tarefa mais antiga de um usuário.
Observação:
Estas rotas podem ser implementadas utilizando os métodos .map, .filter, .resume, .some e outros métodos de manipulação de array para alcançar as funcionalidades desejadas, agregando complexidade média a difícil ao projeto. Certifique-se de implementar as devidas verificações de segurança e validação dos dados em cada rota.
