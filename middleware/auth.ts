export default defineNuxtRouteMiddleware(async (to, from) => {
    const { $api } = useNuxtApp();
    const currentUser = useCurrentUser();

    const token = useCookie("token");
    if (!token) return navigateTo("/login");

    try {
        const { message } = await $api.auth.verify(token.value!);
        const { uuid, username, email, permissions, roles } = message.user;

        currentUser.value = { uuid, username, email, permissions, roles };
    } catch (error) {
        return navigateTo("/login");
    }
});
