import jwt from "jsonwebtoken";
import { User } from "~/utils/user";

export default defineEventHandler((event) => {
    const authorization = event.headers.get("authorization") || "";
    const token = authorization.split(" ")[1];

    if (!token) {
        event.context.isAuthenticated = false;
        event.context.user = null;
        return;
    }

    const { jwtSecretKey } = useRuntimeConfig();

    try {
        const decoded = jwt.verify(token, jwtSecretKey) as User;

        event.context.isAuthenticated = true;
        event.context.user = {
            uuid: decoded.uuid,
            username: decoded.username,
            email: decoded.email,
            permissions: decoded.permissions,
            roles: decoded.roles,
        };
    } catch (err) {
        event.context.isAuthenticated = false;
        event.context.user = null;
    }
});
