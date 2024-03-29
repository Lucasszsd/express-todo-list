import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exception/types/unauthorized.exception";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/constants";

const jwtRegex = /Bearer\s[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+/;
const swaggerUrls = [
  "/api/",
  "/api/swagger-ui.css",
  "/api/swagger-ui-bundle.js",
  "/api/swagger-ui-standalone-preset.js",
  "/api/swagger-ui-init.js",
  "/api/swagger-ui-bundle.js.map",
  "/api/swagger-ui.css.map",
  "/api/swagger-ui-standalone-preset.js.map",
  "/api/favicon-32x32.png",
];

function jwtValidator(routes: string[] = []) {
  const validate = (req: Request, res: Response, next: NextFunction) => {
    if (swaggerUrls.includes(req.url)) return next();
    if (routes.includes(req.url)) return next();

    const bearerToken = req.headers.authorization;

    if (!bearerToken || !jwtRegex.test(bearerToken)) {
      throw new UnauthorizedException("Incorrect JWT Token format");
    }

    const token = bearerToken.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("JWT Token not provided");
    }

    const isValidToken = jwt.verify(token, JWT_SECRET);

    if (!isValidToken) {
      throw new UnauthorizedException("Invalid JWT Token");
    }

    return next();
  };

  return validate;
}

export { jwtValidator };
