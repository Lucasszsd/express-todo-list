import { PrismaClient } from "@prisma/client";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./common/swagger/swagger-config";
import { errorMiddleware } from "./common/middlewares/error-handler.middleware";
import userRoutes from "./user/user.router";
import taskRoutes from "./task/task.router";
import appRoutes from "./routes";
import categoryRoutes from "./category/category.router";
import authRoutes from "./auth/auth.router";
import { jwtValidator } from "./common/middlewares/jwt-validator.middleware";

const prismaClient = new PrismaClient();

export class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
    this.app.use(errorMiddleware);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(jwtValidator(["/signup", "/signin"]));
  }

  private routes() {
    this.app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));
    this.app.use(appRoutes);
    this.app.use(userRoutes);
    this.app.use(taskRoutes);
    this.app.use(categoryRoutes);
    this.app.use(authRoutes);
  }

  private async database() {
    await prismaClient
      .$connect()
      .then(() => {
        console.log("Connected to database!");
      })
      .catch(async (error) => {
        await prismaClient.$disconnect();
        console.error("Error connecting to database: ", error);
      });
  }
}

export default new App().app;
