/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: "Montserrat"
    },
    colors: {
      navBG: "#DDE8E4",
      hover: "#FE9B86",
      hoverText: "#FFF",
      google: "#42854"
    },
  },
  plugins: [],
}