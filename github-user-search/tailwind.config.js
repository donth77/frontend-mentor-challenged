/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        azure: "#0079ff",
        slateGrey: "#697c9a",
        queenBlue: "#4b6a9b",
        gunmetal: "#2b3442",
        ghostWhite: "#f6f8ff",
        snowWhite: "#fefefe",
        white: "#fff",
        darkGunmetal: "#141d2f",
        yankeesBlue: "#1e2a47",
        tart: "#f74646",
        charleston: "#222731",
        ceil: "#90a4d4",
        coolGrey: "#8e94a3",
        wildBlueYonder: "#a5b5cd",
        blueJeans: "#60abff",
      },
      fontFamily: {
        spaceMono: ['"Space Mono"', "monospace"],
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
  darkMode: "class",
};
