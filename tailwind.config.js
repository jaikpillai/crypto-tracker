/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require('tailwindcss/colors')


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/melt-components/dist/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        "primary": ["Sora", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': colors.indigo,
        'accent': colors.lime
      }
    },
  },
  plugins: [],
}
