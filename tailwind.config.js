/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./comps/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'off-white': 'hsl(0, 0%, 98%)',
        'dark-element': 'hsl(209, 23%, 22%)',
        'dark-bg':'hsl(207, 26%, 17%)',
        'light-text':'hsl(200, 15%, 8%)',
        'light-input':'hsl(0, 0%, 52%)'
      },
      fontFamily:{
        sans: ['Nunito Sans','sans-serif']
      },
      padding: {
        '5vw': '15vw',
      },
      extend: {}
    }
  },
  plugins: [],
}
