const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './components/**/*.js',
    './components/**/*.jsx',
    './components/**/*.tsx',
    './pages/**/*.js',
    './pages/**/*.jsx',
    './pages/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')
  ],
}
