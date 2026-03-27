import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#0f172a',
        mist: '#f8fafc',
        line: '#e2e8f0',
      },
    },
  },
  plugins: [],
};

export default config;
