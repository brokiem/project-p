import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const users = await prisma.users.findMany();

  return users.map(user => {
    user.password_hash = 'REDACTED';
    return user;
  })
})
