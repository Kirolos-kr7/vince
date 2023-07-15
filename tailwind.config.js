module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#efedea',
        secondary: '#dad8d8',
      },
      boxShadow: {
        x: '0 4px 20px #e5dde64f',
        xx: 'inset 0px 0px 0px 3px black',
        black: '5px 5px 0 #000',
        gray: '5px 5px 0 #9e8787',
      },
      screens: {
        xs: '460px',
      },
      fontFamily: {
        bioRhyme: 'BioRhyme',
        megrim: 'Megrim',
      },
    },
  },
  variants: {},
  plugins: [],
}
