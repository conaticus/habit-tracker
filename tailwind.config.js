/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#212121",
        primary: "#005fb3",
        secondary: "#444444",
      }
    },
  },
  plugins: [],
}