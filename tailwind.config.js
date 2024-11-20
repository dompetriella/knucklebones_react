/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#500778",
        secondary: "#BB16A3",
        primary: "#EC4067",
        secondary: "#E59D77",
        tertiary: "#B49FCC",
        surface: "#FDF1E1",
        onPrimary: "#FDF1E1",
        onSecondary: "#251605",
        onTertiary: "#251605",
        onSurface: "#251605",
      }
    },
  },
  plugins: [],
}

