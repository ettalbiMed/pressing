import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
        ivory: 'var(--ivory)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        sans: ['"Manrope"', ...fontFamily.sans],
        display: ['"Playfair Display"', ...fontFamily.serif],
      },
      boxShadow: {
        soft: '0 20px 45px rgba(10, 42, 24, 0.12)',
      },
    },
  },
  plugins: [],
}
