import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
    if (!event.context.isAuthenticated) {
        return new Response(JSON.stringify({
            success: false,
            error: "Unauthorized",
        }), { status: 401 }).json();
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
