module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        pmd: {
          100: '#CB2E39',
          200: '#A61103',
          300: '#8F0709',
          400: '#65A603',
          500: '#3B7302',
          900: '#191919',
        }
      },
      screens: {
        '2xl': { 'max': '1535px' },
        'xl': { 'max': '1279px' },
        'lg': { 'max': '1023px' },
        'md': { 'max': '767px' },
        'sm': { 'max': '639px' },
        'xs': { 'max': '460px' },
      }
    },
  },
  plugins: [],
}
