import { prisma } from "~/prisma/db";
import { badRequestResponse, errorResponse, notFoundResponse, successResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        const { id } = getRouterParams(event);
        // Check if competency id is a valid number
        if (isNaN(parseInt(id))) return badRequestResponse("Invalid competency id");

        // Check if competency exists
        const competency = await prisma.competencies.findFirst({
            where: { id: parseInt(id) },
        });

        if (!competency) return notFoundResponse("Competency not found");

        return successResponse({ competency });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to create competency", 500);
    }
});
