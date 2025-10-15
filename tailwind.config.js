/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // P2Pix Design System - based on Figma
        primary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24', // Main amber color
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        background: {
          dark: '#181e2a',
          indigo: '#312e81',
        },
        surface: {
          card: '#f9fafb',
          modal: '#ffffff',
        },
        status: {
          open: '#f59e0b', // Reddish-orange for "Em aberto"
          completed: '#10b981', // Green for "Finalizado"
          expired: '#6b7280',
          pending: '#f59e0b',
        },
        text: {
          primary: '#ffffff',
          secondary: '#9ca3af',
          dark: '#111827',
        }
      },
      backgroundImage: {
        'p2pix-main': 'radial-gradient(ellipse at 50% -50%, rgba(49, 46, 129, 1) 60%, rgba(24, 30, 42, 1) 80%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(251, 191, 36, 0.3)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      }
    },
  },
  plugins: [],
}