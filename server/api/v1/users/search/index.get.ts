import { z } from "zod";
import { errorResponse, forbiddenResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { prisma } from "~/prisma/db";

const querySchema = z.object({
    query: z.string().max(100),
});

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to manage users
        if (!hasPermission(user.permissions, Permissions.MANAGE_USER)) {
            return forbiddenResponse("You do not have permission to manage users!");
        }

        const { query } = await getValidatedQuery(event, query => querySchema.parse(query));

        const users = await prisma.user_profiles.findMany({
            where: {
                OR: [
                    { user_uuid: { contains: query } },
                    { users: { email: { contains: query } } },
                    { username: { contains: query } },
                ],
            },
            include: {
                users: true,
            },
            take: 10,
        });

        return successResponse({ users });
    } catch (e) {
        console.log(e);
        return errorResponse("Failed to seach users");
    }
});
