/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#ffc93c",
        darkOrange: "#ff9e00",
        ligthOrange: "#ffdb7d",
        green: "#cbf078",
        pink: "#fecea8",
        white: "#f9fbfc",
        black: "#1a1a1a",
        grey: "#e5e5e5",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
