/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006413",
        secondary: "#3E4A3C",
        accent: "#FFFBCE"
      },
      fontFamily: {
        primary: "Libre Baskerville, serif",
        secondary: "Raleway, sans-serif"
      }
    },
  },
  plugins: [],
}