/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da categoria
 *         color:
 *           type: string
 *           description: Cor da categoria
 *     ReturnCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID da categoria
 *         name:
 *           type: string
 *           description: Nome da categoria
 *         color:
 *           type: string
 *           description: cor da categoria
 *         createdAt:
 *           type: string
 *           description: Data de criação do livro
 *         updatedAt:
 *           type: string
 *           description: Data de atualização do livro
 */

export interface CategoryEntity {
  id: string;
  name: string;
  color: Color;
  created_at: Date;
  updated_at: Date;
}

export enum Color {
  RED = "RED",
  BLUE = "BLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  PURPLE = "PURPLE",
  ORANGE = "ORANGE",
  PINK = "PINK",
  BROWN = "BROWN",
  GRAY = "GRAY",
  BLACK = "BLACK",
}
