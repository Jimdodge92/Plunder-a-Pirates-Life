/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pirate: {
          parchment: '#fdf6e3',
          'parchment-dark': '#d4b88c',
          wood: '#4e342e',
          'wood-dark': '#3e2723',
          'wood-light': '#6d4c41',
          gold: '#ffd700',
          'gold-dark': '#b8860b',
          ocean: '#0a1a2a',
          'ocean-light': '#1a2a3a',
          crimson: '#8b0000',
          'crimson-light': '#b22222',
        }
      },
      fontFamily: {
        pirata: ['"Pirata One"', 'cursive', 'serif'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        parchment: '0 15px 35px rgba(0,0,0,0.45), inset 0 0 20px rgba(0,0,0,0.1)',
        gold: '0 0 15px rgba(255, 215, 0, 0.4)',
        cannon: '0 0 20px rgba(255, 69, 0, 0.5)',
      }
    },
  },
  plugins: [],
}