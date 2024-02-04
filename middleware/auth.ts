import jwt from "jsonwebtoken";

export default defineNuxtRouteMiddleware((to, from) => {
    const authorization = useRequestHeader('authorization');
    if (!authorization) return navigateTo("/login");

    const token = authorization.split(" ")[1];
    const { jwtSecretKey } = useRuntimeConfig();

    try {
        const decoded = jwt.verify(token, jwtSecretKey!, { algorithms: ["HS384"] });
    } catch (error) {
        return navigateTo("/login");
    }
});
