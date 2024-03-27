import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "./dto";

const prisma = new PrismaClient();

export class UserRepository {
  constructor() {}

  async create(createUserDto: CreateUserDto) {
    return await prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async findAll() {
    return await prisma.user.findMany();
  }

  async findOne(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
