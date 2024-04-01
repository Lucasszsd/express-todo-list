import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async create(req: Request, res: Response) {
    const user = await this.categoryService.create(req.body);
    return res.status(201).json(user);
  }

  async findAll(req: Request, res: Response) {
    const users = await this.categoryService.findAll(req.query);
    return res.status(200).json(users);
  }

  async findOne(req: Request, res: Response) {
    const user = await this.categoryService.findOne(req.params.id);
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.categoryService.update(req.params.id, req.body);
    return res.status(200).json(user);
  }

  async remove(req: Request, res: Response) {
    await this.categoryService.remove(req.params.id);
    return res.status(204).json();
  }
}
