import { prisma } from "~/prisma/db";
import { ArticleFlags, ArticleType, hasFlag } from "~/utils/articles";
import { badRequestResponse, errorResponse, forbiddenResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to create news
        if (!hasPermission(user.permissions, Permissions.CREATE_NEWS)) {
            return forbiddenResponse("You do not have permission to create news");
        }

        const { image_url, title, summary, content, flags } = await readBody(event);

        const author_uuid = user.uuid;

        // @ts-ignore
        // Combined mask for all valid flags
        const combinedMask = Object.values(ArticleFlags).reduce((accumulator, value) => accumulator | value, 0);

        // Input flags sanitization
        let inputFlags = Number(flags) || 0; // Ensure numeric input, default to 0
        inputFlags &= combinedMask; // Ensure only valid bits are set
        inputFlags = Math.min(Math.max(inputFlags, 0), inputFlags & combinedMask); // Restrict to valid range

        if (inputFlags <= 0) return badRequestResponse("Article flags is invalid!");

        // Check if flags contains IS_DRAFT and IS_PUBLISH because only one can be choosen
        if (hasFlag(inputFlags, ArticleFlags.IS_DRAFT | ArticleFlags.IS_PUBLISHED)) {
            return badRequestResponse("Only one of IS_DRAFT or IS_PUBLISH of article flag can be choosen");
        }

        const news = await prisma.articles.create({
            data: {
                image_url,
                title,
                summary,
                content,
                author_uuid,
                type: ArticleType.NEWS,
                flags: inputFlags,
            },
        });

        return successResponse({ news }, 201);
    } catch (e) {
        return errorResponse("Failed to create news");
    }
});
