import { prisma } from "~/prisma/db";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to manage announcement
        if (!hasPermission(user.permissions, Permissions.MANAGE_ANNOUNCEMENT)) {
            return forbiddenResponse("You do not have permission to manage announcements");
        }

        const { id } = getRouterParams(event);
        // Check if announcement id is a valid number
        if (isNaN(parseInt(id))) return badRequestResponse("Invalid announcement id");

        // Check if announcement exists
        const announcement = await prisma.articles.findFirst({
            where: { id: parseInt(id) },
        });

        if (!announcement) return notFoundResponse("Announcement not found");

        const deletedAnnouncement = await prisma.articles.delete({
            where: { id: parseInt(id) },
        });

        return successResponse({
            announcement: deletedAnnouncement,
        });
    } catch (err) {
        return errorResponse("Failed to delete announcement");
    }
});
