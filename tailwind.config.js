/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/templates/**/*.html",
    "./app/static/js/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // UC-inspired color palette (blues and golds)
        'ucr-blue': {
          DEFAULT: '#003DA5', // UC Blue
          '50': '#E6F0FF',
          '100': '#CCE0FF',
          '200': '#99C2FF',
          '300': '#66A3FF',
          '400': '#3385FF',
          '500': '#0066FF',
          '600': '#0052CC',
          '700': '#003DA5', // Primary UCR Blue
          '800': '#002966',
          '900': '#001433',
        },
        'ucr-gold': {
          DEFAULT: '#FFB81C', // UC Gold
          '50': '#FFF8E6',
          '100': '#FFF1CC',
          '200': '#FFE499',
          '300': '#FFD666',
          '400': '#FFC933',
          '500': '#FFB81C', // Primary UCR Gold
          '600': '#E59D00',
          '700': '#B27A00',
          '800': '#805700',
          '900': '#4D3400',
        },
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'bounce-once': 'bounce 0.5s ease-in-out 1',
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
        'typing': 'typing 1.5s infinite',
        'highlander-pulse': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        typing: {
          '0%': { width: '0%' },
          '20%': { width: '20%' },
          '40%': { width: '40%' },
          '60%': { width: '60%' },
          '80%': { width: '80%' },
          '100%': { width: '100%' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 