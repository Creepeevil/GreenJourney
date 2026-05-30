/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f0f8ed",
          100: "#dcefd5",
          600: "#3f7f45",
          700: "#2f6638",
          900: "#183a23"
        },
        paper: "#fbf6e9",
        kraft: "#b7814a",
        ink: "#203126"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(32, 49, 38, 0.12)"
      }
    }
  },
  plugins: []
};
