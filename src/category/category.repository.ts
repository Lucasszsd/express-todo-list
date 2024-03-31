import { PrismaClient } from "@prisma/client";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

const prisma = new PrismaClient();

export class CategoryRepository {
  constructor() {}

  async create(createCategoryDto: CreateCategoryDto) {
    return prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });
  }

  async findAll() {
    return prisma.category.findMany();
  }

  async findOne(id: string) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return prisma.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
      },
    });
  }

  async remove(id: string) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
