/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eeefff",
          100: "#e0e2ff",
          200: "#c7c9fe",
          300: "#a5a5fc",
          400: "#8a81f8",
          500: "#7863f1",
          600: "#6a46e5",
          700: "#5c38ca",
          800: "#4a30a3",
          900: "#3f2e81",
          950: "#261b4b",
        },
        sidebar: "rgb(24 26 51)",
        drowdown: "rgb(42 44 67)",
        "field-invalid": "rgb(232 156 156)",
        "field-focus": "rgb(151 153 234)",
      },
      boxShadow: {
        "text-field":
          "0 0 0 1px #e0e0e0, 0 2px 4px 0 rgb(0 0 0 / 7%), 0 1px 1.5px 0 rgb(0 0 0 / 5%)",
        focus:
          "0 0 0 1px rgb(50 59 211 / 30%), 0 1px 1px 0 rgb(0 0 0 / 7%), 0 0 0 4px rgb(50 53 211 / 30%)",
        invalid:
          "0 0 0 1px rgb(211 50 50 / 30%), 0 1px 1px 0 rgb(0 0 0 / 7%), 0 0 0 4px rgb(211 50 50 / 30%)",
      },
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      montserrat: ["Montserrat", "Helvetica Neue", "sans-serif"],
      openSans: ["Open Sans", "sans-serif"],
      figTree: ["Figtree", "sans-serif"],
    },
  },
  safelist: [
    "text-white",
    "fill-white",
    {
      pattern: /text-(gray|red|yellow)-700/,
    },
    {
      pattern: /py-(1|2)/,
    },
    {
      pattern: /ring-(primary|red|gray)-(600|300)/,
      variants: ["focus"],
    },
    {
      pattern: /border-(red|yellow)-400/,
    },
    {
      pattern: /bg-(primary|red|yellow|gray|white)-(600|700|100|50)/,
      variants: ["hover"],
    },
    {
      pattern: /fill-(red|yellow|gray)-(400|700)/,
    },
    {
      pattern: /stroke-(red|yellow)-(500|600)/,
      variants: ["hover"],
    },
  ],
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
