import { prisma } from "~/prisma/db";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { isValidUUID, User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to delete users
        if (!hasPermission(user.permissions, Permissions.MANAGE_USER)) {
            return forbiddenResponse("You do not have permission to manage users!");
        }

        const { uuid } = getRouterParams(event);
        // Check if user uuid is a valid uuid
        if (!isValidUUID(uuid)) return badRequestResponse("Invalid user uuid");

        const userToDelete = await prisma.users_credentials.findFirst({
            where: { uuid },
        });

        if (!userToDelete) return notFoundResponse("User not found");

        // Delete user from user_profiles table
        await prisma.user_profiles.deleteMany({
            where: { user_uuid: uuid },
        });

        // Delete user from users_credentials table
        await prisma.users_credentials.delete({
            where: { uuid },
        });

        return successResponse({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to delete user");
    }
});
