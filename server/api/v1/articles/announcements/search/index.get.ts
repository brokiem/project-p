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
            // Check if user has permission to manage announcement
            if (hasPermission(user.permissions, Permissions.MANAGE_ANNOUNCEMENT)) {
                // Return all announcements if admin
                const announcements = await prisma.$queryRaw`SELECT * FROM articles WHERE type = ${ArticleType.ANNOUNCEMENT} AND (title LIKE ${myQuery} OR content LIKE ${myQuery}) ORDER BY created_at LIMIT 0, 20`;
                return successResponse({ announcements });
            }
        }

        // This raw query is safe because Prisma creates prepared statements that are safe from SQL injections.
        // Return articles that are ANNOUNCEMENT and PUBLISHED if non admin
        const announcements = await prisma.$queryRaw`SELECT * FROM articles WHERE type = ${ArticleType.ANNOUNCEMENT} AND (flags & ${ArticleFlags.IS_PUBLISHED}) = ${ArticleFlags.IS_PUBLISHED} AND (title LIKE ${myQuery} OR content LIKE ${myQuery}) ORDER BY created_at LIMIT 0, 20`;
        return successResponse({ announcements });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to seach announcement");
    }
});
