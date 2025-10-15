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
        primary: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        gray: {
          400: '#9ca3af',
          500: '#6b7280',
          900: '#111827',
        },
      },
      backgroundImage: {
        'p2pix-gradient': 'radial-gradient(ellipse at 50% -50%, rgba(49, 46, 129, 1) 60%, rgba(24, 30, 42, 1) 80%)',
      },
    },
  },
  plugins: [],
}
