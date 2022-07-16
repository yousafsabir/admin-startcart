/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        load: {
          "0%, 100%": { transform: "translateX(-50%)" },
          "50%": { transform: "translateX(350%)" },
        },
      },
      animation: {
        loading: "load 3.5s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};
