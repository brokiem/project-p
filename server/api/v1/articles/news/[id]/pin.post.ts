import { prisma } from "~/prisma/db";
import { ArticleFlags } from "~/utils/articles";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to manage news
        if (!hasPermission(user.permissions, Permissions.MANAGE_NEWS)) {
            return forbiddenResponse("You do not have permission to manage news");
        }

        const { id } = getRouterParams(event);
        // Check if news id is a valid number
        if (isNaN(parseInt(id))) return badRequestResponse("Invalid news id");

        const existingNews = await prisma.articles.findFirst({
            where: { id: parseInt(id) },
        });

        if (!existingNews) {
            return notFoundResponse("News not found");
        }

        // Add IS_PINNED flags
        const flags = existingNews.flags | ArticleFlags.IS_PINNED;

        const news = await prisma.articles.update({
            where: { id: parseInt(id) },
            data: { flags: flags },
        });

        return successResponse({ news });
    } catch (e) {
        return errorResponse("Failed to pin news");
    }
});
