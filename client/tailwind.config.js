/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    extend: {
      boxShadow: {
        'custom_right' : '10px 10px 1px rgba(0, 0, 0, 0.6)',
      },
      colors: {
        'custom_gray' : '#C1C1C1',
      }
    },
  },
  plugins: [],
}