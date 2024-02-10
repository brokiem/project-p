import { prisma } from "~/prisma/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse, notFoundResponse, successResponse, unauthorizedResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        const { email, password } = await readBody(event);

        const user = await prisma.users_credentials.findFirst({
            where: { email },
            include: { user_profiles: true },
        });

        if (!user) return notFoundResponse("User not found");

        const userProfile = user.user_profiles.length > 0 ? user.user_profiles[0] : null;
        // Return 500 here because the user attributes should always exist
        if (!userProfile) return errorResponse("User profile not found");

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        // Check if the password is valid
        if (!isPasswordValid) return unauthorizedResponse("Invalid password");

        const { user_uuid, username, permissions, roles } = userProfile;
        const { jwtSecretKey } = useRuntimeConfig();

        const token = jwt.sign({ user_uuid, username, email, permissions, roles }, jwtSecretKey!, {
            algorithm: "HS384",
            expiresIn: "7d", // expires in 7 days
        });

        return successResponse({
            token,
            user: { user_uuid, username, email, permissions, roles },
        });
    } catch (err) {
        return errorResponse("Failed to login");
    }
});
