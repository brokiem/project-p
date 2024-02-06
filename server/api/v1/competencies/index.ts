import { prisma } from "~/prisma/db";

export default defineEventHandler((event) => {
    return prisma.competencies.findMany();
});
