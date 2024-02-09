export default defineNuxtRouteMiddleware(async (to, from) => {
    const currentUser = useCurrentUser();
    const token = useCookie("token");

    // If the user is already logged in, do nothing
    if (currentUser.value != null) return;

    // If the user is not logged in, but has a token, try to log them in
    if (!!token.value) {
        try {
            // Verify the token and set the current user
            const res = await verify(token.value);
            currentUser.value = res.user;
        } catch (err) {
            console.error(err);
        }
    }
});
