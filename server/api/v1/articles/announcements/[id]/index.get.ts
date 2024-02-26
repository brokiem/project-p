import { prisma } from "~/prisma/db";
import { errorResponse, successResponse } from "~/utils/response-helper";
import { ArticleFlags } from "~/utils/articles";
import { articles_type as ArticleType } from "@prisma/client";
import { hasPermission, Permissions } from "~/utils/permissions";
import { User } from "~/utils/user";
import { z } from "zod";

const paramsSchema = z.object({
    id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
    try {
        const { id } = await getValidatedRouterParams(event, params => paramsSchema.parse(params));

        if (event.context.isAuthenticated) {
            const user = event.context.user as User;
            // Check if user has permission to manage announcement
            if (hasPermission(user.permissions, Permissions.MANAGE_ANNOUNCEMENT)) {
                // Return all announcements if admin
                const announcement = await prisma.articles.findFirst({
                    where: {
                        id: id,
                        type: ArticleType.ANNOUNCEMENT,
                    },
                });

                return successResponse({ announcement });
            }
        }

        // This raw query is safe because Prisma creates prepared statements that are safe from SQL injections.
        // Return articles that are ANNOUNCEMENT and PUBLISHED if non admin
        const announcements: any = await prisma.$queryRaw`SELECT * FROM articles WHERE id = ${id} AND type = ${ArticleType.ANNOUNCEMENT} AND (flags & ${ArticleFlags.IS_PUBLISHED}) = ${ArticleFlags.IS_PUBLISHED}`;
        const announcement = announcements[0] || null;
        return successResponse({ announcement });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to fetch announcement");
    }
});
