/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: { 'skranji': ['Skranji', 'cursive'], 'Yeseva One': ['Yeseva One', 'serif'] },
        },
    },
    plugins: [],
}

