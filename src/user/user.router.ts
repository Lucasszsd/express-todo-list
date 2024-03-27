import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/exception/async-error-handler";
import { UserController, UserRepository, UserService } from "./index";

const userController = new UserController(
  new UserService(new UserRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas para operações relacionadas a usuários
 */
const userRoutes = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Cria um usuário novo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnUser'
 * */
userRoutes.post(
  "/users",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.create(req, res);
  }),
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser retornado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnUser'
 * */
userRoutes.get(
  "/users/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.findOne(req, res);
  }),
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *        200:
 *          description: Lista de usuários retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnUser'
 * */
userRoutes.get(
  "/users",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.findAll(req, res);
  }),
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza um usuário existente pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnUser'
 * */
userRoutes.patch(
  "/users/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.update(req, res);
  }),
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário existente pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser excluído
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: usuário excluído com sucesso
 */
userRoutes.delete(
  "/users/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await userController.remove(req, res);
  }),
);

export default userRoutes;
