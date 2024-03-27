import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API With Postgres and Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
  },
  apis: [
    path.resolve(__dirname, "../../user/user.router.ts"),
    path.resolve(__dirname, "../../user/entities/user.entity.ts"),
    path.resolve(__dirname, "../../task/task.router.ts"),
    path.resolve(__dirname, "../../task/entities/task.entity.ts"),
    path.resolve(__dirname, "../../category/category.router.ts"),
    path.resolve(__dirname, "../../category/entities/category.entity.ts"),
  ],
} as swaggerJSDoc.Options;

export const specs = swaggerJSDoc(options);
