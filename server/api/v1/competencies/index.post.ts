import { prisma } from "~/prisma/db";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { errorResponse, forbiddenResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to delete competencies
        if (!hasPermission(user.permissions, Permissions.CREATE_COMPETENCY)) {
            return forbiddenResponse("You do not have permission to create competencies");
        }

        const { title, description } = await readBody(event);
        const competency = await prisma.competencies.create({
            data: { title: title, description: description },
        });

        return successResponse({ competency }, 201);
    } catch (err) {
        return errorResponse("Failed to create competency");
    }
});
