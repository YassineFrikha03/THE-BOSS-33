/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#0a0a0a',
        brandCard: '#1a1a1a',
        brandGold: '#e5b869',
      }
    },
  },
  plugins: [],
}