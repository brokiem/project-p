import { prisma } from "~/prisma/db";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to delete extracurriculars
        if (!hasPermission(user.permissions, Permissions.MANAGE_EXTRACURRICULAR)) {
            return forbiddenResponse("You do not have permission to delete extracurriculars");
        }

        const { id } = getRouterParams(event);
        // Check if extracurricular id is a valid number
        if (isNaN(parseInt(id))) return badRequestResponse("Invalid extracurricular id");

        // Check if extracurricular exists
        const extracurricular = await prisma.extracurriculars.findFirst({
            where: { id: parseInt(id) },
        });

        if (!extracurricular) return notFoundResponse("Extracurricular not found");

        const deleteMentors = prisma.extracurricular_mentors.deleteMany({
            where: { extracurricular_id: parseInt(id) },
        });
        const deleteExtracurricular = prisma.extracurriculars.delete({
            where: { id: parseInt(id) },
        });

        // Delete the extracurricular and associated extracurricular_mentors
        const transaction = await prisma.$transaction([deleteMentors, deleteExtracurricular]);

        // Remove first element from the array as it contains the count of deleted extracurricular_mentors
        transaction.shift();

        return successResponse({
            extracurriculars: transaction,
        });
    } catch (err) {
        return errorResponse("Failed to delete extracurricular");
    }
});
