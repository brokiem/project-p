import { prisma } from "~/prisma/db";
import { badRequestResponse, errorResponse, forbiddenResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";
import { User } from "~/utils/user";
import { hasPermission, Permissions } from "~/utils/permissions";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

type UserInput = {
    username: string;
    permissions: number;
    roles: number;
    email: string;
    password: string;
};

export default defineEventHandler(async (event) => {
    try {
        if (!event.context.isAuthenticated) return unauthorizedResponse("Unauthorized");

        const user = event.context.user as User;
        // Check if user has permission to create users
        if (!hasPermission(user.permissions, Permissions.CREATE_USER)) {
            return forbiddenResponse("You do not have permission to create users!");
        }

        const userInput: UserInput = await readBody(event);
        // Validate user input
        if (!userInput.username || !userInput.permissions || !userInput.roles || !userInput.email || !userInput.password) {
            return badRequestResponse("Invalid user input");
        }

        // Check if email already exists
        const existingUser = await prisma.users_credentials.findFirst({
            where: { email: userInput.email },
        });

        if (existingUser) {
            return badRequestResponse("Email already in use");
        }

        // Validate permissions and roles
        const permissions = parseInt(String(userInput.permissions));
        const roles = parseInt(String(userInput.roles));
        if (isNaN(permissions) || isNaN(roles)) {
            return badRequestResponse("Invalid permissions or roles");
        }

        // Hash the password before storing it in the database
        const salt = bcrypt.genSaltSync(14);
        const hash = bcrypt.hashSync(userInput.password, salt);
        const uuid = randomUUID();

        const newUser = await prisma.users_credentials.upsert({
            where: { uuid },
            update: {},
            create: {
                uuid: uuid,
                email: userInput.email,
                password_hash: hash,
                user_profiles: {
                    create: {
                        username: userInput.username,
                        permissions: permissions,
                        roles: roles,
                    },
                },
            },
        });

        return successResponse({ user: newUser });
    } catch (err) {
        console.log(err);
        return errorResponse("Failed to create user");
    }
});
