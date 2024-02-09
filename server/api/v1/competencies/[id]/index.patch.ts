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
    if (!hasPermission(user.permissions, Permissions.MANAGE_COMPETENCY)) {
        return new Response(JSON.stringify({
            success: false,
            error: "You do not have permission to do this action!",
        }), { status: 403 }).json();
    }

    const { id } = getRouterParams(event);
    const { title, description } = await readBody(event);

    try {
        if (isNaN(parseInt(id))) {
            return new Response(JSON.stringify({
                success: false,
                error: "Invalid id",
            }), { status: 400 }).json();
        }

        // Check if competency exists
        const competency = await prisma.competencies.findFirst({
            where: {
                id: parseInt(id),
            },
        });

        if (!competency) {
            return new Response(JSON.stringify({
                success: false,
                error: `Competency not found`,
            }), { status: 404 }).json();
        }

        // Update the competency
        const updatedCompetency = await prisma.competencies.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                description,
            },
        });

        return new Response(JSON.stringify({
            success: true,
            message: {
                competencies: updatedCompetency,
            },
        })).json();
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: `Failed to update competency with id ${id}`,
        }), { status: 500 }).json();
    }
});
