/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    // Safelist dynamic classes used in components (e.g., companion cards in SalesPage)
    safelist: [
        { pattern: /bg-(purple|cyan|green|amber|red)-(900|500)/ },
        { pattern: /border-(purple|cyan|green|amber|red)-(500|400)/ },
        { pattern: /text-(purple|cyan|green|amber|red)-(400|500)/ },
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
