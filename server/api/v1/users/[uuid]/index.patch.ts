import { prisma } from "~/prisma/db";
import { badRequestResponse, errorResponse, forbiddenResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { isValidUUID, User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to manage users
        if (!hasPermission(user.permissions, Permissions.MANAGE_USER)) {
            return forbiddenResponse("You do not have permission to manage users!");
        }

        const { uuid } = getRouterParams(event);
        // Check if user uuid is a valid uuid
        if (!isValidUUID(uuid)) return badRequestResponse("Invalid user uuid");

        const userProfile = await prisma.user_profiles.findFirst({
            where: { user_uuid: uuid },
        });

        if (!userProfile) return notFoundResponse("User not found");

        const body: { username: string, email: string, password?: string; permissions: number; roles: number; } = await readBody(event);
        // Validate user input
        if (!body.username || !body.email || !body.permissions || !body.roles) {
            return badRequestResponse("Invalid user input");
        }

        // Check if email already exists and is not the same as the current user
        const existingUser = await prisma.users_credentials.findFirst({
            where: { email: body.email },
        });

        if (existingUser && existingUser.uuid !== uuid) {
            return badRequestResponse("Email already in use");
        }

        // Validate permissions and roles
        const permissions = parseInt(String(body.permissions));
        const roles = parseInt(String(body.roles));
        if (isNaN(permissions) || isNaN(roles)) {
            return badRequestResponse("Invalid permissions or roles");
        }

        let hash;
        if (body.password) {
            // Hash the password before storing it in the database
            const salt = bcrypt.genSaltSync(14);
            hash = bcrypt.hashSync(body.password, salt);
        }

        // Update user credentials
        const userCredsUpdated = await prisma.users_credentials.update({
            where: { uuid },
            data: {
                email: body.email,
                ...(hash && { password_hash: hash }),
            },
        });

        // Update user profile
        const userProfilesUpdated = await prisma.user_profiles.update({
            where: { user_uuid: uuid },
            data: {
                username: body.username,
                permissions,
                roles,
            },
        });

        // Delete password_hash from userCredsUpdated
        // @ts-ignore
        delete userCredsUpdated.password_hash;

        return successResponse({ user: { ...userCredsUpdated, user_profiles: userProfilesUpdated } });
    } catch (err) {
        return errorResponse("Failed to fetch user");
    }
});
