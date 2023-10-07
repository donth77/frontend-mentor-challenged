/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        darkCharcoal: "#303030",
        spanishGray: "#999",
        whiteBackdrop: "rgba(255, 255, 255, 0.5)",
        blackBackdrop: "rgba(0, 0, 0, 0.75)",
      },
      keyframes: {
        fadeOutIn: {
          "0%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        fadeOutIn: "fadeOutIn 2s ease-in-out",
      },
    },
  },
  plugins: [],
};
