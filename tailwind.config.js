/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'from-[#141414]',
    'to-[#292929]',
    'bg-gray-800/30'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
