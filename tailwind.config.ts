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
          DEFAULT: "rgb(var(--border-color-rgb) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Geist", "Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        marquee: "marquee 80s linear infinite",
        "marquee-fast": "marquee 40s linear infinite",
        "cell-in": "cell-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        caret: "caret 1s steps(1) infinite",
      },
      keyframes: {
        "cell-in": {
          "0%": { opacity: "0", transform: "scaleY(0.15)" },
          "100%": { opacity: "1", transform: "scaleY(1)" },
        },
        caret: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
