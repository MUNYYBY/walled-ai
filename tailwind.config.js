/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}", // Legacy Pages Router (if used)
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#28273F",
        brand: "#141220",
        primaryColor: "var(--primaryColor)",
        secondaryColor: "var(--secondaryColor)",
        backgroundColor: "var(--backgroundColor)",
      },
      fontFamily: {
        anek: "var(--anek)",
      },
    },
  },
  plugins: [],
};
