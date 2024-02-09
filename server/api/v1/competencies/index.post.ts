import { prisma } from "~/prisma/db";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";

export default defineEventHandler(async (event) => {
    if (!event.context.isAuthenticated) {
        return new Response(JSON.stringify({
            success: false,
            error: "Unauthorized",
        }), { status: 401 }).json();
    }

    const user = event.context.user as User;

    // Check if user has permission to delete competencies
    if (!hasPermission(user.permissions, Permissions.CREATE_COMPETENCY)) {
        return new Response(JSON.stringify({
            success: false,
            error: "You do not have permission to do this action!",
        }), { status: 403 }).json();
    }

    const { title, description } = await readBody(event);

    try {
        const competency = prisma.competencies.create({
            data: {
                title,
                description,
            },
        });

        return new Response(JSON.stringify({
            success: true,
            message: { competency },
        })).json();
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: "Failed to create competency",
        }), { status: 500 }).json();
    }
});
