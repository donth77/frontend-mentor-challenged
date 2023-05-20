/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      cream: "hsl(30, 38%, 92%)",
      white: "hsl(0, 0%, 100%)",
      darkCyan: "hsl(158, 36%, 37%)",
      veryDarkBlue: "hsl(212, 21%, 14%)",
      darkGrayishBlue: "hsl(228, 12%, 48%)",
      deepAquamarineHover: "#1a4032",
    },
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', "sans-serif"],
        fraunces: ['"Fraunces"', "serif"],
      },
      backgroundImage: {
        "mobile-img": "url('../images/image-product-mobile.jpg ')",
        "desktop-img": "url('./images/image-product-desktop.jpg ')",
      },
    },
  },
  plugins: [],
};
