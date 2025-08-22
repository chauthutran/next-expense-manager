import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            keyframes: {
                'pulse-alert': {
                    '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                    '50%': { opacity: '0.7', transform: 'scale(1)' }
                }
            },
            animation: {
                'pulse-alert': 'pulse-alert 1s infinite'
            },
            colors: {
            }
        }
    },
    plugins: []
};
export default config;
