/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      corail: {
        reg: "#FF7E50",
        pale: "#FFA485 ",
        clair: "#FFCAB8",
      },
    },
  },
  plugins: [],
};
