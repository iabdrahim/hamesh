/** @type {import('tailwindcss').Config} */
import BLOG from "./BLOG.config";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        day: {
          DEFAULT: BLOG.lightBackground || "#f6f8fa",
        },
        night: {
          DEFAULT: BLOG.darkBackground || "#212936",
        },
        primaryColor: {
          DEFAULT: BLOG.primaryColor || "#6455c7",
        },
        primaryColorD: {
          DEFAULT: BLOG.primaryColorD || "#6455c7",
        },
      },
    },
  },

  plugins: [],
};
