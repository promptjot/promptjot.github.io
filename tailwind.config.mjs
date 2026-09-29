/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // User requested palette: #2A7C13, #76C457, #FFF8CF, #FBE6C2
        palette: {
          forest: '#2A7C13',
          leaf: '#76C457',
          butter: '#FFF8CF',
          sand: '#FBE6C2',
        },
        brand: {
          50: '#f4fbf0',
          100: '#e6f7df',
          200: '#cfefc0',
          300: '#aee297',
          400: '#76C457', // Leaf Green accent
          500: '#5aa83a',
          600: '#43872a',
          700: '#346b22',
          800: '#2A7C13', // Deep Forest Green primary
          900: '#235213',
          950: '#0f2c07',
        },
        sand: {
          50: '#FFF8CF', // Soft Butter/Cream
          100: '#fff4bd',
          200: '#FBE6C2', // Warm Biscuit Sand
          300: '#f5d59e',
          400: '#ebba73',
          500: '#e09f4d',
          600: '#c57e37',
          700: '#9d5e2c',
          800: '#7e4b28',
          900: '#673e24',
        },
        surface: {
          lightCanvas: '#FFF8CF',
          lightCard: '#ffffff',
          lightBorder: '#FBE6C2',
          darkCanvas: '#0a1309',
          darkCard: '#121e10',
          darkMuted: '#1a2b17',
          darkBorder: '#233d1f',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
