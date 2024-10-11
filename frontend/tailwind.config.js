// tailwind.config.js

import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // If you have an index.html file in the root
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JavaScript and TypeScript files inside `src` folder
  ],
  theme: {
    extend: {
      fontFamily: {
        newsreader: ['Newsreader', 'san-serif'],
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    theme: ["light", "dark"],
  }
};
