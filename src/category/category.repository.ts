import { PrismaClient } from "@prisma/client";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

const prisma = new PrismaClient();

export class CategoryRepository {
  constructor() {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  async findAll() {
    return await prisma.category.findMany();
  }

  async findOne(id: string) {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await prisma.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
      },
    });
  }

  async remove(id: string) {
    return await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
