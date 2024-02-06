import jwt from "jsonwebtoken";
import type { User } from "~/utils/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const currentUser = useCurrentUser();

    const authorization = useRequestHeader('authorization');
    if (!authorization) return navigateTo("/login");

    const token = authorization.split(" ")[1];
    const { jwtSecretKey } = useRuntimeConfig();

    try {
        const payload = jwt.verify(token, jwtSecretKey!, { algorithms: ["HS384"] });
        const { uuid, username, email, permissions, roles } = payload as User;

        currentUser.value = { uuid, username, email, permissions, roles };
    } catch (error) {
        return navigateTo("/login");
    }
});
