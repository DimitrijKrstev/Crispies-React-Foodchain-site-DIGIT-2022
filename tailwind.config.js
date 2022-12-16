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
        'offgray': '#4b4b4b',
        'beige': '#FFE1BD',
        'beigeLight': '#fdf6ec',
        'terra': '#fd9e90',
      },
    },
  },
  plugins: [],
}