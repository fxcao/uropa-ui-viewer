module.exports = {
    content: [
        './public/index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
    ]
}