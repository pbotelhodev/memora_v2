/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Agora você pode usar 'font-poppins'
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        // Cores semânticas para o Memora
        "memora-bg": "#0F172A", // Fundo principal (Usada como bg-memora-bg)
        "memora-purple": "#7D49F2", // Roxo (Usada como from-memora-purple)
        "memora-cyan": "#06B6D4", // Ciano (Usada como to-memora-cyan)
      },
    },
  },
  plugins: [],
};
