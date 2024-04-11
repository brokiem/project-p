import { prisma } from "~/prisma/db";
import { badRequestResponse, errorResponse, notFoundResponse, successResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        const { id } = getRouterParams(event);
        // Check if extracurricular id is a valid number
        if (isNaN(parseInt(id))) return badRequestResponse("Invalid extracurricular id");

        // Check if extracurricular exists
        const extracurricular = await prisma.extracurriculars.findFirst({
            where: { id: parseInt(id) },
            include: {
                extracurricular_mentors: {
                    select: { id: true, users: true },
                },
            },
        });

        if (!extracurricular) return notFoundResponse("Extracurricular not found");

        return successResponse({ extracurricular });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to create extracurricular", 500);
    }
});
