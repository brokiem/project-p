// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
        },
    },
    routeRules: {
        "/": { isr: 86400 },
        "/profil/fasilitas": { prerender: true },
        "/profil/logo": { prerender: true },
        "/profil/sejarah": { prerender: true },
        "/profil/struktur-organisasi": { prerender: true },
        "/profil/visi-misi": { prerender: true },
        "/kesiswaan/tatatertib": { prerender: true },
        "/kesiswaan/ekstrakurikuler": { isr: 86400 },
    },
    runtimeConfig: {
        jwtSecretKey: process.env.JWT_SECRET_KEY,
        imageKitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        imageKitUrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
        },
    },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => ["QuillEditor"].includes(tag),
        },
    },
    devtools: { enabled: false },
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
