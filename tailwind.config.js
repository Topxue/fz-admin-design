/** @type {import('tailwindcss').Config} */
const { preset } = require('twin.arco')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg_color: 'var(--color-bg-2)',
        primary: 'var(--color-primary-6)'
      }
    }
  },
  plugins: [],
  presets: [preset()]
}
