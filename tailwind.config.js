
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'neon-glow': 'neon-glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'neon-glow': {
          '0%': {
            'box-shadow': '0 0 10px rgba(0, 102, 255, 0.3), 0 0 20px rgba(0, 102, 255, 0.2)',
          },
          '100%': {
            'box-shadow': '0 0 5px rgba(0, 102, 255, 0.2), 0 0 10px rgba(0, 102, 255, 0.1)',
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      colors: {
        'neon-blue': '#0066ff',
        'neon-light': '#3399ff',
        'light-bg': '#f8fafc',
        'light-card': '#ffffff',
      }
    },
  },
  plugins: [],
}