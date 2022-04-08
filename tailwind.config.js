const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem",
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        feliner: {
          default: "#E31662",
          100: "#FACCDD",
          200: "#F59EBE",
          300: "#F16F9F",
          400: "#EC4180",
          500: "#E31662",
          600: "#B5124E",
          700: "#870D3A",
          800: "#580926",
          900: "#2A0412",
        },
      },
    },
  },
  plugins: [],
}
