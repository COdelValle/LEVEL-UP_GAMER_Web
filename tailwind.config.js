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
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        }
      }
    },
  },
  plugins: [],
}