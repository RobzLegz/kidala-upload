const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                tiny: '0.625rem',
                xs: '.75rem',
                sm: '.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '4rem',
                '7xl': '5rem',
            },
            colors: {
                notification: {
                    DEFAULT: '#FD4D4D',
                    red: '#FD4D4D',
                    loading: '#F2B861',
                },
                primary: {
                    100: '#DEE3EA',
                    200: '#B2BDCD',
                    300: '#5D7290',
                    400: '#4F617A',
                    500: '#404F64',
                    600: '#323D4D',
                    700: '#242C37',
                    800: '#151A21',
                    900: '#0B0E11',
                },
                button: '#FFFFFF',
                secondary: {
                    DEFAULT: '#DEE3EA',
                    'washed-out': '#F5BFBF',
                },
                accent: {
                    DEFAULT: '#FD4D4D',
                    hover: '#FD6868',
                    disabled: '#FD6868',
                },
                transparent_dark: {
                    DEFAULT: 'rgba(0, 0, 0, 0.4)',
                },
            },
            borderWidth: {
                DEFAULT: '1px',
                0: '0px',
                4: '4px',
                2: '2px',
                3: '3px',
            },
            borderRadius: {
                5: '5px',
                8: '8px',
                20: '20px',
                40: '40px',
            },
            keyframes: {
                border: {
                    '100%': { transform: 'rotate(-360deg)' },
                },
            },
            animation: {
                'spin-slow': 'spin 15s linear forwards infinite',
                'border-animate': 'border 4s infinite linear',
            },
        },
    },
    plugins: [],
};
