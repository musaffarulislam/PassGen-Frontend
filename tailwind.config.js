/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary_dark : "#050a19",
        secondary_dark : "#032046",
        primary_light : "#F0FCFF",
        secondary_light : "#C4CCEE",
      }
    },
  },
  plugins: [],
}

