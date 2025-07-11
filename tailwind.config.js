/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'gradient-pan': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        }
      },
      animation: {
        'gradient-pan': 'gradient-pan 4s ease-in-out infinite',
      },
      backgroundSize: {
        '300': '300% 300%',
      }
    },
  },
  plugins: [],
} 