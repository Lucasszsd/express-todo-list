/**
 * @swagger
 * components:
 *   schemas:
 *      Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email do usuário
 *           example: matheusbaraldi@mail.com
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: string
 *      ReturnLogin:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           description: JWT Token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjQwMzQwMzQwMzQwMzQwMzQwMzQwMzQiLCJlbWFpbCI6Im1hdGhldXNiYXJhn
 */

export const loginDto = {
  email: {
    type: "email",
    required: "Email is required",
  },
  password: {
    minLength: 5,
    maxLength: 25,
    required: "Password is required",
  },
};

export interface LoginDto {
  email: string;
  password: string;
}
