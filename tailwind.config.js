/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // pro Next.js
    "./pages/**/*.{js,ts,jsx,tsx}", // pro Next.js
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // pro Vite
  ],
  theme: {
    extend: {
      colors: {
        modra: '#00B6E6',
        cerna: '#27251F',
        modraHover: '#0096BB',
        bilaHover: '#EAFBFF',
        sparta: '#6B7280',
        lightBlue: '#E8F4F8',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        lekton: ['Lekton', 'sans-serif'],
      },
      animation: {
        carousel: 'carousel var(--carousel-duration, 20s) linear infinite',
      },
      keyframes: {
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-1500px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-1500px)' },
        },
      },
    },
  },
  plugins: [],
};
