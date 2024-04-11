// Only allow numbers
const regex = RegExp("^[0-9]+$");

export default defineNuxtRouteMiddleware((to, from) => {
    const requestedPage = to.params.page.toString();

    // Check if page parameter is a number
    if (!regex.exec(requestedPage) || parseInt(requestedPage) <= 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "Halaman tidak ditemukan",
        });
    }
});
