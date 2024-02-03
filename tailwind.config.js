/** @type {import("tailwindcss").Config} */
export default {
    darkMode: "class",
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
        "./nuxt.config.{js,ts}",
        "./node_modules/flowbite/**/*.{js,ts}",
    ],
    theme: {
        extend: {
            maxWidth: {
                "default": "950px",
            },
        },
    },
    plugins: [
        require("flowbite/plugin"),
    ],
};
