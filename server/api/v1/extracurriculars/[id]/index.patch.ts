import { prisma } from "~/prisma/db";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        // Authenticate and authorize the user
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        if (!hasPermission(user.permissions, Permissions.MANAGE_EXTRACURRICULAR)) {
            return forbiddenResponse("You do not have permission to manage extracurriculars");
        }

        const { id } = getRouterParams(event);
        // Check if extracurricular id is a valid number
        if (isNaN(parseInt(id))) return badRequestResponse("Invalid extracurricular id");

        // Check if extracurricular exists
        const extracurricular = await prisma.extracurriculars.findFirst({
            where: { id: parseInt(id) },
        });

        if (!extracurricular) return notFoundResponse("Extracurricular not found");

        const body: { title: string, description: string, mentor_uuids?: string } = await readBody(event);
        let mentorUuidsArray: string[] = [];

        // Check if mentor_uuids is provided and create an array of mentor_uuids
        if (!!body.mentor_uuids) {
            const mentors = body.mentor_uuids.split(",");

            if (mentors.length > 0) {
                mentorUuidsArray = mentors.map((mentor_uuid: string) => {
                    return mentor_uuid;
                });
            }
        }

        // Check if mentor_uuids is provided
        if (mentorUuidsArray.length > 0) {
            // NOTE: For you have hard time understanding this code (dear future me!)
            // 1. Get all the existing mentor_uuids for the extracurricular
            // 2. Compare the existing mentor_uuids with the mentor_uuidsArray received from the request
            // 3. Create an array of mentor_uuids to add and remove
            // 4. Add the mentor_uuids that are not in the existing mentor_uuids
            // 5. Remove the mentor_uuids that are not in the mentor_uuidsArray received from the request
            //
            // So that we can update the extracurricular_mentors table accordingly
            // making this code more efficient and less error-prone than deleting all the mentors and adding them again

            // Fetch existing mentor UUIDs for comparison
            const existingMentorUuids = (await prisma.extracurricular_mentors.findMany({
                where: { extracurricular_id: parseInt(id) },
            })).map(m => m.mentor_uuid);

            // Identify mentors to add and remove
            const addMentorUuids = mentorUuidsArray.filter(uuid => !existingMentorUuids.includes(uuid));
            const removeMentorUuids = existingMentorUuids.filter(uuid => !mentorUuidsArray.includes(uuid));

            // Variables to contain prisma queries to use in prisma.$transaction
            let addMentors, removeMentors = null;

            // Create new mentors (if any)
            if (addMentorUuids.length > 0) {
                addMentors = prisma.extracurricular_mentors.createMany({
                    data: addMentorUuids.map(mentor_uuid => {
                        return {
                            mentor_uuid,
                            extracurricular_id: parseInt(id),
                        };
                    }),
                });
            }

            // Remove unwanted mentors (if any)
            if (removeMentorUuids.length > 0) {
                removeMentors = prisma.extracurricular_mentors.deleteMany({
                    where: {
                        extracurricular_id: parseInt(id),
                        mentor_uuid: { in: removeMentorUuids },
                    },
                });
            }

            // Update the extracurricular_mentors table
            if (!!addMentors && !!removeMentors) {
                // Use prisma.$transaction to run multiple queries in a single transaction
                await prisma.$transaction([addMentors, removeMentors]);
            } else {
                if (!!addMentors) await prisma.$transaction([addMentors]);
                if (!!removeMentors) await prisma.$transaction([removeMentors]);
            }
        } else {
            // Remove all mentors beacuse mentor_uuids is not provided
            await prisma.extracurricular_mentors.deleteMany({
                where: { extracurricular_id: parseInt(id) },
            });
        }

        // Create the extracurricular and associated extracurricular_mentors
        const updatedExtracurricular = await prisma.extracurriculars.update({
            where: { id: parseInt(id) },
            data: {
                title: body.title,
                description: body.description,
            },
            include: {
                extracurricular_mentors: {
                    select: { id: true, users: true },
                },
            },
        });

        return successResponse({ extracurricular: updatedExtracurricular });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to create extracurricular", 500);
    }
});
