import jwt from "jsonwebtoken";
import type { User } from "~/utils/user";
import { successResponse, unauthorizedResponse } from "~/utils/response-helper";

export default defineEventHandler(async (event) => {
    try {
        const authorization = event.headers.get("authorization") || "";
        const token = authorization.split(" ")[1];
        const { jwtSecretKey } = useRuntimeConfig(event);

        // Verify the token, if it's invalid, it will throw an error
        // So this is always safe to use
        const decoded = jwt.verify(token, jwtSecretKey) as User;
        return successResponse({
            user: {
                uuid: decoded.uuid,
                username: decoded.username,
                email: decoded.email,
                permissions: decoded.permissions,
                roles: decoded.roles,
            },
        });
    } catch (err) {
        return unauthorizedResponse("Invalid token");
    }
});
