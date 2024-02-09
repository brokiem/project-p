import { prisma } from "~/prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

    const user = await prisma.users.findFirst({
        where: { email },
    });

    if (!user) {
        return new Response(JSON.stringify({
            success: false,
            error: "User not found",
        }), { status: 404 }).json();
    }

    const userAttributes = await prisma.user_attributes.findFirst({
        where: { user_uuid: user.uuid },
    });

    if (!userAttributes) {
        // Return 500 here because the user attributes should always exist
        return new Response(JSON.stringify({
            success: false,
            error: "User attributes not found",
        }), { status: 500 }).json();
    }

    // Check if the password is valid using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        return new Response(JSON.stringify({
            success: false,
            error: "Invalid password",
        }), { status: 401 }).json();
    }

    const { uuid, username } = user;
    const { jwtSecretKey } = useRuntimeConfig();
    const { permissions, roles } = userAttributes;

    const token = jwt.sign({ uuid, username, email, permissions, roles }, jwtSecretKey!, {
        algorithm: "HS384",
        expiresIn: "7d", // expires in 7 days
    });

    return new Response(JSON.stringify({
        success: true,
        message: {
            token,
            user: {
                uuid,
                username,
                email,
                permissions,
                roles,
            },
        },
    })).json();
});