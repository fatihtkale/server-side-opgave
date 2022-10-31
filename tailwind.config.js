/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#18191A',
        'primary-middle': '#242526',
        'primary-light': '#3A3B3C',
        'primary-text-light': '#E4E6EB',
        'primary-text-dark': '#B0B3B8'
      }
    },
  },
  plugins: [],
}
