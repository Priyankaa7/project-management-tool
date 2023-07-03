/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: "#101113",
        primary_text: "#FFFFFF",
        brand: "#1098ad",
        active_bg: "#25262b",
        form_text: "#868e96"
      }
    },
  },
  plugins: [],
}

