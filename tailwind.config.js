/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        amiri: ['Amiri', 'serif'],
      },
      colors: {
        primary: {
          default: '#B7EBF7',
        },
        secondary: {
          default: '#E1F4F4',
          list: '#14B6DA'
        }
      },
    },
  },
  plugins: [],
};
