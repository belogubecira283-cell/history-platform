/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        imperial: {
          gold: '#cda250',
          green: '#1b3b2b',
          red: '#722f37',
          parchment: '#fcfaf2'
        }
      }
    },
  },
  plugins: [],
}
