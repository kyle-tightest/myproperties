/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0D0D2B',
        'secondary-dark': '#1E1E3F',
        'accent-cyan': '#00E5FF',
        'accent-pink': '#FF00E5',
        'light-text': '#E0E0E0',
      },
      fontFamily: {
        'orbitron': ['"Orbitron"', 'sans-serif'],
        'sans': ['"Roboto"', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00E5FF, 0 0 10px #00E5FF, 0 0 20px #00E5FF',
        'neon-pink': '0 0 5px #FF00E5, 0 0 10px #FF00E5, 0 0 20px #FF00E5',
      }
    },
  },
  plugins: [],
}