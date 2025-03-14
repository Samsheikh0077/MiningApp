/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#0a0f1e",
        neonGreen: "#00ff99",
        neonBlue: "#00ccff",
        neonYellow: "#ffcc00",
      },
      boxShadow: {
        neon: "0 0 10px #00ff99",
        neonBlue: "0 0 10px #00ccff",
        neonYellow: "0 0 10px #ffcc00",
      },
    },
  },
  plugins: [],
};
