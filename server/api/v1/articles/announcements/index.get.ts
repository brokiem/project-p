import { prisma } from "~/prisma/db";
import { errorResponse, successResponse } from "~/utils/response-helper";
import { ArticleFlags } from "~/utils/articles";
import { articles_type as ArticleType } from "@prisma/client";
import { hasPermission, Permissions } from "~/utils/permissions";
import { User } from "~/utils/user";
import { z } from "zod";

const querySchema = z.object({
    limit: z.coerce.number().max(100).default(100),
    offset: z.coerce.number().default(0),
});

export default defineEventHandler(async (event) => {
    try {
        const { offset, limit } = await getValidatedQuery(event, query => querySchema.parse(query));

        if (event.context.isAuthenticated) {
            const user = event.context.user as User;
            // Check if user has permission to manage announcement
            if (hasPermission(user.permissions, Permissions.MANAGE_ANNOUNCEMENT)) {
                // Return all announcements if admin
                const announcements = await prisma.articles.findMany({
                    where: {
                        type: ArticleType.ANNOUNCEMENT,
                    },
                    orderBy: {
                        created_at: "desc",
                    },
                    skip: offset,
                    take: limit,
                });

                return successResponse({ announcements });
            }
        }

        // This raw query is safe because Prisma creates prepared statements that are safe from SQL injections.
        // Return articles that are ANNOUNCEMENT and PUBLISHED if non admin
        const announcements = await prisma.$queryRaw`SELECT * FROM articles WHERE type = ${ArticleType.ANNOUNCEMENT} AND (flags & ${ArticleFlags.IS_PUBLISHED}) = ${ArticleFlags.IS_PUBLISHED} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
        return successResponse({ announcements });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to fetch announcements");
    }
});
