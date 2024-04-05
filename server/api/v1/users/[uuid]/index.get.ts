import { prisma } from "~/prisma/db";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { isValidUUID, User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to manage users
        if (!hasPermission(user.permissions, Permissions.MANAGE_USER)) {
            return forbiddenResponse("You do not have permission to manage users!");
        }

        const { uuid } = getRouterParams(event);
        // Check if user uuid is a valid uuid
        if (!isValidUUID(uuid)) return badRequestResponse("Invalid user uuid");

        const userProfile = await prisma.user_profiles.findFirst({
            where: { user_uuid: uuid },
        });

        if (!userProfile) return notFoundResponse("User not found");

        return successResponse({ user: userProfile });
    } catch (err) {
        return errorResponse("Failed to fetch user");
    }
});
