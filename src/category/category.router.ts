import { Request, Response, Router } from "express";
import { asyncErrorHandler } from "../common/exception/async-error-handler";
import {
  CategoryController,
  CategoryRepository,
  CategoryService,
} from "./index";

const categoryController = new CategoryController(
  new CategoryService(new CategoryRepository()),
);

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Rotas para operações relacionadas a categorias
 */
const categoryRoutes = Router();

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Category]
 *     summary: Cria uma categoria nova
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCategory'
 * */
categoryRoutes.post(
  "/category",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.create(req, res);
  }),
);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags: [Category]
 *     responses:
 *        200:
 *          description: Lista de categorias retornada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ReturnCategory'
 * */
categoryRoutes.get(
  "/category",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.findAll(req, res);
  }),
);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria a ser retornada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: categoria retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCategory'
 * */
categoryRoutes.get(
  "/category/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.findOne(req, res);
  }),
);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Atualiza uma categoria existente pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do categoria a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReturnCategory'
 * */
categoryRoutes.patch(
  "/category/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.update(req, res);
  }),
);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Exclui uma categoria existente pelo ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: categoria excluída com sucesso
 */
categoryRoutes.delete(
  "/category/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await categoryController.remove(req, res);
  }),
);

export default categoryRoutes;
