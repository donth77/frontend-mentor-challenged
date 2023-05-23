/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      white: "#fff",
      orange: "hsl(25, 97%, 53%)",
      lightGrey: "hsl(216, 12%, 63%)",
      mediumGrey: "hsl(217, 12%, 54%)",
      darkBlue: "hsl(213, 19%, 18%)",
      veryDarkBlue: "hsl(216, 12%, 8%)",
    },
    extend: {
      backgroundImage: {
        gradientBlack:
          "radial-gradient(98.96% 98.96% at 50% 0%, #232A34 0%, #181E27 100%)",
      },
      fontFamily: {
        overpass: ['"Overpass"', "sans-serif"],
      },
      boxShadow: {
        mild: "0 0 50px #ccc",
      },
    },
  },
  plugins: [],
};
