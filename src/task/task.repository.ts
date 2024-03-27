import { PrismaClient } from "@prisma/client";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

const prisma = new PrismaClient();

export class TaskRepository {
  constructor() {}

  async create(createTaskDto: CreateTaskDto) {
    return await prisma.task.create({
      data: {
        ...createTaskDto,
      },
    });
  }

  async findAll() {
    return await prisma.task.findMany();
  }

  async findOne(id: string) {
    return await prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await prisma.task.update({
      where: {
        id,
      },
      data: {
        ...updateTaskDto,
      },
    });
  }

  async remove(id: string) {
    return await prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
