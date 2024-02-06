/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        protest: ['Protest Strike', 'serif']
      },
      boxShadow: {
        primary: '#422800 4px 4px 0 0',
        secondary: '#dddddd 4px 4px 0 0',
        'primary-invert': '#422800 -4px -4px 0 0',
        'secondary-invert': '#dddddd -4px -4px 0 0'
      },
      colors: {
        custom: {
          100: ({ opacityVariable, opacityValue }) => {
            if (opacityValue !== undefined) {
              return `rgba(var(--color-custom-100), ${opacityValue})`
            }
            if (opacityVariable !== undefined) {
              return `rgba(var(--color-custom-100), var(${opacityVariable}, 1))`
            }
            return `rgb(var(--color-custom-100))`
          },
          200: ({ opacityVariable, opacityValue }) => {
            if (opacityValue !== undefined) {
              return `rgba(var(--color-custom-200), ${opacityValue})`
            }
            if (opacityVariable !== undefined) {
              return `rgba(var(--color-custom-200), var(${opacityVariable}, 1))`
            }
            return `rgb(var(--color-custom-200))`
          },
          300: ({ opacityVariable, opacityValue }) => {
            if (opacityValue !== undefined) {
              return `rgba(var(--color-custom-300), ${opacityValue})`
            }
            if (opacityVariable !== undefined) {
              return `rgba(var(--color-custom-300), var(${opacityVariable}, 1))`
            }
            return `rgb(var(--color-custom-300))`
          },
          400: ({ opacityVariable, opacityValue }) => {
            if (opacityValue !== undefined) {
              return `rgba(var(--color-custom-400), ${opacityValue})`
            }
            if (opacityVariable !== undefined) {
              return `rgba(var(--color-custom-400), var(${opacityVariable}, 1))`
            }
            return `rgb(var(--color-custom-400))`
          }
        }
      }
    }
  },
  plugins: []
}
