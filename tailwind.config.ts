/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#F4F4F2",
          dark: "#111111",
          DEFAULT: "var(--background-color)",
        },
        surface: {
          light: "#EBEBE8",
          dark: "#191919",
          DEFAULT: "var(--surface-color)",
        },
        foreground: {
          light: "#171717",
          dark: "#F1F1ED",
          DEFAULT: "var(--foreground-color)",
        },
        secondary: {
          light: "#555555",
          dark: "#A6A6A0",
          DEFAULT: "var(--secondary-color)",
        },
        muted: {
          light: "#888888",
          dark: "#70706C",
          DEFAULT: "var(--muted-color)",
        },
        border: {
          light: "#D2D2CE",
          dark: "#30302D",
          DEFAULT: "var(--border-color)",
        },
      },
      fontFamily: {
        sans: ["Geist", "Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
