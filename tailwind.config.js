/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#c2410c', dark: '#ea580c' },
        board: { called: '#22c55e', uncalled: '#e5e7eb' },
      },
      animation: {
        'pop': 'pop 0.4s ease-out',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0.5' },
          '70%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom, 0px)',
        'safe-top': 'env(safe-area-inset-top, 0px)',
      },
    },
  },
  plugins: [],
};
