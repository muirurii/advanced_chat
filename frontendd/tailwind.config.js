/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/*.{js,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                main: [" Poppins,sans-serif;"],
            },
            colors: {
                // secondary: "#0077ff",
            },
            height: {
                screenLessHeader: "calc(100vh - 0px)",
            },
            width: {
                formHead: "calc(100% + 1em)",
            }
        }
    },
    plugins: [],
}