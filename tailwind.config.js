/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // Explicit light/dark choice is applied as a class on <html> (see the
  // theme-init script in app/layout.tsx and app/components/theme/ThemeToggle).
  darkMode: 'selector',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
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
        // Reference surface starting points.
        background: '#27251F',
        'background-light': '#E6E4DD',
        // Legacy tokens kept so the not-yet-redesigned route bodies (phase 03)
        // keep rendering. Do not use these in new phase 02 code.
        modra: '#00B6E6',
        modraHover: '#0096BB',
        cerna: '#27251F',
        bila: '#FFFFFF',
        bilaHover: '#EAFBFF',
        sparta: '#6B7280',
        lightBlue: '#E8F4F8',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-1500px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        carousel: 'carousel var(--carousel-duration, 20s) linear infinite',
      },
    },
  },
  plugins: [],
};
