/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'neon-amber': '#FFBF00',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(57, 255, 20, 0.8)',
          },
          '50%': {
            opacity: '0.7',
            boxShadow: '0 0 40px rgba(57, 255, 20, 1)',
          },
        },
      },
    },
  },
  plugins: [],
}
