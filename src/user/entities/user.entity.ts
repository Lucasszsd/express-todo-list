/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         weight:
 *           type: integer
 *           description: Peso do usuário
 *     ReturnUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         weight:
 *           type: integer
 *           description: Peso do usuário
 *         createdAt:
 *           type: string
 *           description: Data de criação do livro
 *         updatedAt:
 *           type: string
 *           description: Data de atualização do livro
 */

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  weight: number;
  created_at: Date;
  updated_at: Date;
}
