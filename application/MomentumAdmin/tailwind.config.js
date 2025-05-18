/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      transform: ["hover", "focus"],
      translate: ["hover", "focus"],
      rotate: ["hover", "focus"],
    },
  },
  plugins: [],
};
