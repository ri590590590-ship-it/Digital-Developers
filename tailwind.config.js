/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-2': '#111214',
        'bg-3': '#1a1c1e',
        amber: '#FFB300',
        'amber-2': '#FFA53C',
        'amber-3': '#FFC46B',
        text: '#F5F3EE',
        'text-2': '#c9c5bd',
        muted: '#9a968f',
      },
      fontFamily: {
        display: ['Sora', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '18px',
      },
    },
  },
  plugins: [],
};
