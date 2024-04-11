import { prisma } from "~/prisma/db";
import { errorResponse, successResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        const competencies = await prisma.competencies.findMany();
        return successResponse({ competencies });
    } catch (err) {
        return errorResponse("Failed to fetch competencies");
    }
});
