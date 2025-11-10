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
        },
        'pulse-glow': {
          '0%, 100%': { 
            'box-shadow': '0 0 15px rgba(59, 130, 246, 0.3), 0 0 25px rgba(147, 51, 234, 0.2)',
            'transform': 'scale(1)'
          },
          '50%': { 
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.4), 0 0 35px rgba(147, 51, 234, 0.25)',
            'transform': 'scale(1.01)'
          },
        },
        'shimmer': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        }
      },
      animation: {
        'gradient-pan': 'gradient-pan 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3.5s linear infinite',
      },
      backgroundSize: {
        '300': '300% 300%',
        '200': '200% 100%',
      }
    },
  },
  plugins: [],
} 