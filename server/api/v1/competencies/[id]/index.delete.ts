import { prisma } from "~/prisma/db";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to delete competencies
        if (!hasPermission(user.permissions, Permissions.MANAGE_COMPETENCY)) {
            return forbiddenResponse("You do not have permission to delete competencies");
        }

        const { id } = getRouterParams(event);
        // Check if competency id is a valid number
        if (isNaN(parseInt(id))) return badRequestResponse("Invalid competency id");

        // Check if competency exists
        const competency = await prisma.competencies.findFirst({
            where: { id: parseInt(id) },
        });

        if (!competency) return notFoundResponse("Competency not found");

        const deletedCompetency = await prisma.competencies.delete({
            where: { id: parseInt(id) },
        });

        return successResponse({
            competency: deletedCompetency,
        });
    } catch (err) {
        return errorResponse("Failed to delete competency");
    }
});
