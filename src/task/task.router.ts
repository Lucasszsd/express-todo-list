import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/exception/async-error-handler";
import { TaskController, TaskRepository, TaskService } from "./index";

const taskController = new TaskController(
  new TaskService(new TaskRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Rotas para operações relacionadas a tarefas
 */
const taskRoutes = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Cria uma tarefa nova
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnTask'
 * */
taskRoutes.post(
  "/tasks",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.create(req, res);
  }),
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *        200:
 *          description: Lista de tarefas retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnTask'
 * */
taskRoutes.get(
  "/tasks",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.findAll(req, res);
  }),
);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do tarefa a ser retornada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: tarefa retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnTask'
 * */
taskRoutes.get(
  "/tasks/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.findOne(req, res);
  }),
);

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Atualiza uma tarefa existente pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do tarefa a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnTask'
 * */
taskRoutes.patch(
  "/tasks/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.update(req, res);
  }),
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Exclui uma tarefa existente pelo ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da tarefa a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: tarefa excluída com sucesso
 */
taskRoutes.delete(
  "/tasks/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await taskController.remove(req, res);
  }),
);

export default taskRoutes;
