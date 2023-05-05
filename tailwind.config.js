/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    // Add more paths if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};