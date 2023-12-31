/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": {
          50: "#f3f1ff",
          100: "#e9e6ff",
          200: "#d5d0ff",
          300: "#b7aaff",
          400: "#937aff",
          500: "#7245ff",
          600: "#611fff",
          700: "#530ef3",
          800: "#400abd",
          900: "#3a0ba7",
          950: "#200372",
        },
        "primary-gray": {
          50: "#f9fafb",
          100: "#f4f5f7",
          200: "#e5e7eb",
          300: "#d2d6dc",
          400: "#9fa6b2",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#252f3f",
          900: "#161e2e",
        },
      },
    },
  },
  plugins: [],
};
