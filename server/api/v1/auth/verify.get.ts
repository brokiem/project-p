import jwt from "jsonwebtoken";
import { User } from "~/utils/user";

export default defineEventHandler(async (event) => {
    const authorization = event.headers.get("authorization") || "";
    const token = authorization.split(" ")[1];

    const { jwtSecretKey } = useRuntimeConfig();

    try {
        const decoded = jwt.verify(token, jwtSecretKey) as User;

        return new Response(JSON.stringify({
            success: true,
            message: {
                user: {
                    uuid: decoded.uuid,
                    username: decoded.username,
                    email: decoded.email,
                    permissions: decoded.permissions,
                    roles: decoded.roles,
                },
            },
        })).json();
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: "Token is invalid",
        }), { status: 401 }).json();
    }
});
