/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      lightRed: "hsl(0, 100%, 67%)",
      orangeyYellow: "hsl(39, 100%, 56%)",
      greenTeal: "hsl(166, 100%, 37%)",
      cobaltBlue: "hsl(234, 85%, 45%)",
      lightSlateBlue: "hsl(252, 100%, 67%)",
      lightRoyalBlue: "hsl(241, 81%, 54%)",
      violetBlue: "hsla(256, 72%, 46%, 1)",
      persianBlue: "hsla(241, 72%, 46%, 0)",
      white: "hsl(0, 0%, 100%)",
      paleBlue: "hsl(221, 100%, 96%)",
      lightLavender: "hsl(241, 100%, 89%)",
      darkGrayBlue: "hsl(224, 30%, 27%)",
      veryLightBlue: "#ecf2ff",
      redBg: "#fff6f6",
      yellowBg: "#fffbf4",
      greenBg: "#f2fcf9",
      blueBg: "#f3f4fd",
    },
    extend: {
      fontFamily: {
        hankenGrotesk: ['"Hanken Grotesk"', "sans-serif"],
      },
      opacity: {
        51.68: ".5168",
      },
    },
  },
  plugins: [],
};
