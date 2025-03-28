/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6f42c1',
        secondary: '#6c757d',
        informationColor: '#a793c0',
        timerBg: '#28374b',
        timerText: '#f6ad0b'
      },
    },
  },
  plugins: [],
};
