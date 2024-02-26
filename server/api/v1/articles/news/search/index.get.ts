import { prisma } from "~/prisma/db";
import { errorResponse, successResponse } from "~/utils/response-helper";
import { ArticleFlags } from "~/utils/articles";
import { articles_type as ArticleType } from "@prisma/client";
import { hasPermission, Permissions } from "~/utils/permissions";
import { User } from "~/utils/user";
import { z } from "zod";

const querySchema = z.object({
    query: z.string().max(100),
});

export default defineEventHandler(async (event) => {
    try {
        const { query } = await getValidatedQuery(event, query => querySchema.parse(query));
        const myQuery = "%" + decodeURIComponent(query).toLowerCase() + "%";

        if (event.context.isAuthenticated) {
            const user = event.context.user as User;
            // Check if user has permission to manage news
            if (hasPermission(user.permissions, Permissions.MANAGE_NEWS)) {
                // Return all news if admin
                const news = await prisma.$queryRaw`SELECT * FROM articles WHERE type = ${ArticleType.NEWS} AND (title LIKE ${myQuery} OR content LIKE ${myQuery}) ORDER BY created_at LIMIT 0, 20`;
                return successResponse({ news });
            }
        }

        // This raw query is safe because Prisma creates prepared statements that are safe from SQL injections.
        // Return articles that are NEWS and PUBLISHED if non admin
        const news = await prisma.$queryRaw`SELECT * FROM articles WHERE type = ${ArticleType.NEWS} AND (flags & ${ArticleFlags.IS_PUBLISHED}) = ${ArticleFlags.IS_PUBLISHED} AND (title LIKE ${myQuery} OR content LIKE ${myQuery}) ORDER BY created_at LIMIT 0, 20`;
        return successResponse({ news });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to seach news");
    }
});
