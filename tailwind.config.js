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
        background: '#1B1B1F',
        secondaryBg: 'rgba(255,255,255,0.1)',
        tertiaryBg: '#303236',
        tradeRed: '#FF4238',
        tradeGreen: '#04c226',
        tradeRedBg: 'rgba(255, 66, 56, 0.12)',
        tradeGreenBg: 'rgba(4, 194, 38, 0.12)',
        inactiveLabels: '#B2B3B3'
      }
    },
  },
  plugins: [],
}
