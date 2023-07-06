/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "hsl(26, 100%, 55%)",
        paleOrange: "hsl(25, 100%, 94%)",
        veryDarkBlue: "hsl(220, 13%, 13%)",
        darkGrayishBlue: "hsl(219, 9%, 45%)",
        grayishBlue: "hsl(220, 14%, 75%)",
        lightGrayishBlue: "hsl(223, 64%, 98%)",
        white: "hsl(0, 0%, 100%)",
        black: "hsl(0, 0%, 0%)",
        dividerColor: "#e4e9f2",
        overlayBg: "rgba(0, 0, 0, 0.5)",
        hoverOrange: "#ffab6a",
      },
      fontFamily: {
        kumbhSans: ['"Kumbh Sans"', "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in",
      },
    },
  },
  plugins: [],
};
