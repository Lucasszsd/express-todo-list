import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async signin(req: Request, res: Response) {
    const token = await this.authService.signin(req.body);
    res.status(200).json(token);
  }

  async signup(req: Request, res: Response) {
    const user = await this.authService.signup(req.body);
    return res.status(201).json(user);
  }
}
