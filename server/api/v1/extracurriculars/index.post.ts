import { prisma } from "~/prisma/db";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { errorResponse, forbiddenResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        // Authenticate and authorize the user
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        if (!hasPermission(user.permissions, Permissions.CREATE_EXTRACURRICULAR)) {
            return forbiddenResponse("You do not have permission to create extracurriculars");
        }

        const body: { title: string, description: string, mentor_uuids?: string } = await readBody(event);
        let mentorUuidsArray: { mentor_uuid: string }[] = [];

        // Check if mentor_uuids is provided and create an array of mentor_uuids
        if (!!body.mentor_uuids) {
            const mentors = body.mentor_uuids.split(",");

            if (mentors.length > 0) {
                mentorUuidsArray = mentors.map((mentor_uuid: string) => {
                    return { mentor_uuid };
                });
            }
        }

        // Create the extracurricular and associated extracurricular_mentors
        const extracurricular = await prisma.extracurriculars.create({
            data: {
                title: body.title,
                description: body.description,
                extracurricular_mentors: {
                    create: mentorUuidsArray,
                },
            },
            include: {
                extracurricular_mentors: {
                    select: { id: true, users: true },
                },
            },
        });

        return successResponse({ extracurricular }, 201);
    } catch (err) {
        return errorResponse("Failed to create extracurricular", 500);
    }
});
