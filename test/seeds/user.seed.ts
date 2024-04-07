import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const users = [
  {
    id: "1",
    name: "Matheus Baraldi",
    email: "matheus.baraldi@mail.com",
    password: "matheus123",
    weight: 100,
  },
  {
    id: "2",
    name: "Thiago Bussola",
    email: "thiago.bussola@mail.com",
    password: "thiago123",
    weight: 60,
  },
  {
    id: "3",
    name: "Rodrigo Goes",
    email: "rodrigo.goes@mail.com",
    password: "rodrigo123",
    weight: 150,
  },
];

export async function seed() {
  const addedUsers = [];
  for (const user of users) {
    addedUsers.push(await prisma.user.create({ data: user }));
  }
  await Promise.all(addedUsers);
}

export async function unseed() {
  const ids = users.map((user) => user.id);
  await prisma.user.deleteMany({ where: { id: { in: ids } } });
}
