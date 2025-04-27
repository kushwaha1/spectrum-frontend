module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1E3A8A', // Deep blue for brand
                secondary: '#3B82F6', // Lighter blue for buttons
                accent: '#10B981', // Green for success
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};