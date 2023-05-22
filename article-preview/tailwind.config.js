/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        veryDarkGrayishBlue: "hsl(217, 19%, 35%)",
        desaturatedDarkBlue: "hsl(214, 17%, 51%)",
        grayishBlue: "hsl(212, 23%, 69%)",
        lightGrayishBlue: "hsl(210, 46%, 95%)",
        veryLightBlue: "#ebf2f8",
        white: "#fff",
      },
      fontFamily: {
        manrope: ['"Manrope"', "sans-serif"],
      },
      boxShadow: {
        mild: "0 0 50px #ccc",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(76px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        slideUp: "slideUp 0.2s ease-out",
      },
    },
    screens: {
      sm: "735px",
      // => @media (min-width: 735px) { ... }
    },
  },
  plugins: [],
};
