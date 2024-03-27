import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    return res.status(201).json(user);
  }

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll();
    return res.status(200).json(users);
  }

  async findOne(req: Request, res: Response) {
    const user = await this.userService.findOne(req.params.id);
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.update(req.params.id, req.body);
    return res.status(200).json(user);
  }

  async remove(req: Request, res: Response) {
    await this.userService.remove(req.params.id);
    return res.status(204).json();
  }
}
