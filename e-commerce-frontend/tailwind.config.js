/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nerko: ['"Nerko One"', 'cursive'],
        pixelify: ['"Pixelify Sans"', 'sans-serif'],
        playwrite: ['"Playwrite CU"', 'sans-serif'],
        protest: ['"Protest Guerrilla"', 'cursive'],
      },
    },
  },
  plugins: [],
}

