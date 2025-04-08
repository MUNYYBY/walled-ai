/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}", // Legacy Pages Router (if used)
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
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
      fontSize: {
        headingText: "2.75rem",
        normalText: "1.1rem",
        baseText: "1.8rem",
      },
    },
  },
  plugins: [],
};
