import { prisma } from "~/prisma/db";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";

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

        // Check if news exists
        const news = await prisma.articles.findFirst({
            where: { id: parseInt(id) },
        });

        if (!news) return notFoundResponse("News not found");

        const { title, content, image_url, author_uuid } = await readBody(event);

        const updatedNews = await prisma.articles.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                image_url,
                author_uuid,
                updated_at: new Date(),
            },
        });

        return successResponse({
            news: updatedNews,
        });
    } catch (err) {
        return errorResponse("Failed to update news");
    }
});
