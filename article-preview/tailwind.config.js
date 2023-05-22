/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      veryDarkGrayishBlue: "hsl(217, 19%, 35%)",
      desaturatedDarkBlue: "hsl(214, 17%, 51%)",
      grayishBlue: "hsl(212, 23%, 69%)",
      lightGrayishBlue: "hsl(210, 46%, 95%)",
      veryLightBlue: "#ebf2f8",
      white: "#fff",
    },
    extend: {
      fontFamily: {
        manrope: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        mild: "0 0 50px #ccc",
      },
    },
    screens: {
      sm: "690px",
      // => @media (min-width: 680px) { ... }
    },
  },
  plugins: [],
};
