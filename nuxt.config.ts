// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
    },
    routeRules: {
        "/": { prerender: true },
    },
    devtools: { enabled: true },
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxt/image",
        "@nuxtjs/tailwindcss",
        ["@nuxtjs/google-fonts", {
            families: {
                Rubik: [100, 300, 400, 500, 700, 900],
            },
        }],
        "@nuxt/test-utils/module",
    ],
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});
