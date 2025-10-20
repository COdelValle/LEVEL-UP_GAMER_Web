/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-electrico': '#1E90FF',
        'azul-claro': '#39cfff',
        'verde-neon': '#39FF14',
        'azul-oscuro': '#0a192f',
        'gaming-black': '#000000',
        'gaming-gray': '#D3D3D3'
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      backgroundImage: {
        'gradient-gaming': 'linear-gradient(135deg, #1E90FF 0%, #39cfff 100%)',
        'gradient-dark': 'linear-gradient(120deg, #101a2a 70%, #203a43 100%)'
      }
    },
  },
  plugins: [],
}