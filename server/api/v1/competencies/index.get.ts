import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
    try {
        const competencies = await prisma.competencies.findMany();

        return new Response(JSON.stringify({
            success: true,
            message: { competencies },
        })).json();
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: "Failed to fetch competencies",
        }), { status: 500 }).json();
    }
});
