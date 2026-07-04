/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bank: {
          navy: "#231522",
          ink: "#130F18",
          surface: "#FAF7F4",
          line: "#E9DED8",
          muted: "#766970",
          green: "#FF7A1A",
          greenDark: "#E91E5D",
          gold: "#FFB35C",
        },
      },
      boxShadow: {
        glass: "0 24px 80px rgba(19, 15, 24, 0.3)",
        phone: "0 42px 100px rgba(19, 15, 24, 0.42)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
