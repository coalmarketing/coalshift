/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // Explicit light/dark choice is applied as a class on <html> (see the
  // theme-init script in app/layout.tsx and app/components/theme/ThemeToggle).
  darkMode: 'selector',
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Inter for body/interface, Lekton for headings and expressive labels.
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        lekton: ['Lekton', ...defaultTheme.fontFamily.sans],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // COALsoft blue — the Coalshift primary accent, derived into a full
        // scale so hover/focus/tint variants can be picked against measured
        // contrast pairs.
        coalsoft: {
          DEFAULT: '#00B5E2',
          50: '#E6F9FE',
          100: '#CCF3FD',
          200: '#99E6FB',
          300: '#5AD5F5',
          400: '#1FC3EC',
          500: '#00B5E2',
          600: '#0091B8',
          700: '#00728F',
          800: '#005064',
          900: '#00323F',
          950: '#001E26',
        },
        // Family brand-icon identities. These stay tied to their own brands and
        // are never Coalshift's main theme.
        coalsoftBrand: '#00B5E2',
        coalios: '#FF9E1B',
        coaledu: '#F2C700',
        coalmarketing: '#C181C6',
        coalfamily: '#26C672',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
