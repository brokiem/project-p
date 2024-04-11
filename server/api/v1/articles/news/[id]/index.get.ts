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
            // Check if user has permission to manage news
            if (hasPermission(user.permissions, Permissions.MANAGE_NEWS)) {
                // Return all news if admin
                const news = await prisma.articles.findFirst({
                    where: {
                        id: id,
                        type: ArticleType.NEWS,
                    },
                });

                return successResponse({ news });
            }
        }

        // This raw query is safe because Prisma creates prepared statements that are safe from SQL injections.
        // Return articles that are NEWS and PUBLISHED if non admin
        const newsArray: any = await prisma.$queryRaw`SELECT * FROM articles WHERE id = ${id} AND type = ${ArticleType.NEWS} AND (flags & ${ArticleFlags.IS_PUBLISHED}) = ${ArticleFlags.IS_PUBLISHED}`;
        const news = newsArray[0] || null;
        return successResponse({ news });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to fetch news");
    }
});
