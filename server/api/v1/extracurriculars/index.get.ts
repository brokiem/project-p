import { prisma } from "~/prisma/db";
import { errorResponse, successResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        const extracurriculars = await prisma.extracurriculars.findMany({
            include: {
                extracurricular_mentors: {
                    select: { id: true, users: true },
                },
            },
        });

        return successResponse({ extracurriculars });
    } catch (err) {
        return errorResponse("Failed to fetch extracurriculars");
    }
});
