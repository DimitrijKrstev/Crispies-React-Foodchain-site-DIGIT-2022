/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sea': '#3CB371',
        'sealight': '#7ddea9',
        'offblack': '#171717',
        'beige': '#FFE1BD',
        'terra': '#fc897a',
      },
    },
  },
  plugins: [],
}