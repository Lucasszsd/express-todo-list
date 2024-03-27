/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo da tarefa
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *         priority:
 *           type: string
 *           description: Prioridade da tarefa
 *         status:
 *           type: string
 *           description: Status da tarefa
 *         category_id:
 *           type: string
 *           description: Categoria da tarefa
 *         conclusion:
 *           type: string
 *           description: Conclusão da tarefa
 *         user_id:
 *           type: integer
 *           description: Usuário da tarefa
 *     ReturnTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Titulo da tarefa
 *         description:
 *           type: string
 *           description: Descrição da tarefa
 *         priority:
 *           type: string
 *           description: Prioridade da tarefa
 *         status:
 *           type: string
 *           description: Status da tarefa
 *         category_id:
 *           type: string
 *           description: Categoria da tarefa
 *         conclusion:
 *           type: string
 *           description: Conclusão da tarefa
 *         user_id:
 *           type: integer
 *           description: Usuário da tarefa
 *         createdAt:
 *           type: string
 *           description: Data de criação da tarefa
 *         updatedAt:
 *           type: string
 *           description: Data de atualização da tarefa
 */

export interface TaskEntity {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  category_id?: string;
  conclusion?: Date;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Status {
  PENDING = "PENDING",
  DOING = "DOING",
  DONE = "DONE",
}
