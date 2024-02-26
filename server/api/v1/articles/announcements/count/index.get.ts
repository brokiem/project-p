import { prisma } from "~/prisma/db";
import { errorResponse, successResponse } from "~/utils/response-helper";
import { ArticleFlags } from "~/utils/articles";
import { articles_type as ArticleType } from "@prisma/client";
import { hasPermission, Permissions } from "~/utils/permissions";
import { User } from "~/utils/user";

export default defineEventHandler(async (event) => {
    try {
        if (event.context.isAuthenticated) {
            const user = event.context.user as User;
            // Check if user has permission to manage announcement
            if (hasPermission(user.permissions, Permissions.MANAGE_ANNOUNCEMENT)) {
                // Return all announcements if admin
                const announcements: { count: bigint }[] = await prisma.$queryRaw`SELECT COUNT(*) as count FROM articles WHERE type = ${ArticleType.ANNOUNCEMENT}`;
                const count = String(announcements[0].count);

                return successResponse({ count });
            }
        }

        // This raw query is safe because Prisma creates prepared statements that are safe from SQL injections.
        // Return articles that are ANNOUNCEMENT and PUBLISHED if non admin
        const announcements: { count: bigint }[] = await prisma.$queryRaw`SELECT COUNT(*) as count FROM articles WHERE type = ${ArticleType.ANNOUNCEMENT} AND (flags & ${ArticleFlags.IS_PUBLISHED}) = ${ArticleFlags.IS_PUBLISHED}`;
        const count = String(announcements[0].count);

        return successResponse({ count });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to fetch announcement count");
    }
});
