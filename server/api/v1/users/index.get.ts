import { prisma } from "~/prisma/db";
import { errorResponse, forbiddenResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to manage users
        if (!hasPermission(user.permissions, Permissions.MANAGE_USER)) {
            return forbiddenResponse("You do not have permission to manage users!");
        }

        const users = await prisma.user_profiles.findMany();

        return successResponse({ users });
    } catch (err) {
        return errorResponse("Failed to fetch users");
    }
});
