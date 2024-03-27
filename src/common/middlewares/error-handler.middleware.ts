import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception/types/http-exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  let message = "Internal Server Error";
  let statusCode = 500;

  if (err instanceof HttpException) {
    message = err.message;
    statusCode = err.statusCode;
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      if (err.meta) message = `${err.meta.modelName} not found`;
      statusCode = 404;
    }

    if (err.code === "P2002") {
      if (err.meta) message = `${err.meta.target}`;
      statusCode = 400;
    }
  }

  res.status(statusCode).json({
    message,
    statusCode,
  });
  next();
};
