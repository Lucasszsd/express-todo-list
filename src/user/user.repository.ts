import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "./dto";

const prisma = new PrismaClient();

const USER_SELECT_FIELDS = {
  id: true,
  name: true,
  email: true,
  weight: true,
  createdAt: true,
  updatedAt: true,
} as Prisma.UserSelect;

export class UserRepository {
  constructor() {}

  async create(createUserDto: CreateUserDto) {
    return await prisma.user.create({
      data: {
        ...createUserDto,
      },
      select: USER_SELECT_FIELDS,
    });
  }

  async findAll() {
    return await prisma.user.findMany({
      select: USER_SELECT_FIELDS,
    });
  }

  async findOne(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: USER_SELECT_FIELDS,
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
      select: USER_SELECT_FIELDS,
    });
  }

  async remove(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
      select: USER_SELECT_FIELDS,
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }
}
