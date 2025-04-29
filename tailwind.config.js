/** @type {import('tailwindcss').Config} */
 Oto pełna konfiguracja tailwind.config.js, dostosowana do React Native z nativewind, aby działała od razu z twoim projektem Expo i TypeScript:

module.exports = {
  content: [
    "./App.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",     // Niebieski (Tailwind: blue-600)
        secondary: "#10b981",   // Zielony (Tailwind: emerald-500)
        background: "#f9fafb",  // Jasne tło
        surface: "#ffffff",     // Karty / elementy UI
        muted: "#6b7280"        // Tekst pomocniczy
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem"
      }
    }
  },
  plugins: [],
  presets: [require("tailwindcss-react-native/preset")]
}
