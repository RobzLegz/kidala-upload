module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                transparent_dark: {
                    DEFAULT: 'rgba(0, 0, 0, 0.4)',
                },
            },
            animation: {
                'spin-slow': 'spin 15s linear forwards infinite',
            },
        },
    },
    plugins: [],
};
