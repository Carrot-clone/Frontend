/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{ts,tsx,js,jsx}'],
  darkMode: false, 
  theme: {
      extend: {fontFamily : {
        'soojin' : ['ImcreSoojin']
      }},
  },
  variants: {
      extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}