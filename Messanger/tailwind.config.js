/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "grab": "rgb(140,163,165)",
        "blue": "rgb(10, 18, 42)",
        "orange": "rgb(187, 107, 0)"
      }
    },
  },
  plugins: [],
}