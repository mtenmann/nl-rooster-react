/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wow-bg': '#2a2a2a',      // Dark slate background
        'wow-dark': '#121212',    // Deep dark for sections or overlays
        'wow-gold': '#d4af37',    // Gold accents for highlights or hover states
        'wow-brown': '#5c3a21',   // Earthy brown for borders or buttons
      },
      fontFamily: {
        // Use a WoW-like font; you'll need to import it in your index.html or via CSS import.
        wow: ['MedievalSharp', 'serif'],
      },
    },
  },
  plugins: [],
}
