/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fruit: {
          green: "#16a34a",
          emerald: "#059669",
          orange: "#f97316",
          amber: "#d97706",
          red: "#dc2626",
          cream: "#fefce8",
          dark: "#0f172a",
        },
        wp: {
          dark: "#1d2327",
          sidebar: "#1e1e2d",
          sidebarHover: "#2a2a3c",
          blue: "#2271b1",
          blueHover: "#135e96",
          lightBg: "#f0f0f1",
          border: "#c3c4c7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "bounce-slight": "bounceSlight 2s infinite",
        "pulse-glow": "pulseGlow 2s infinite",
        fall: "fallDown 10s linear infinite",
      },
      keyframes: {
        bounceSlight: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(34, 197, 94, 0.4)" },
          "50%": { boxShadow: "0 0 25px rgba(34, 197, 94, 0.8)" },
        },
        fallDown: {
          "0%": { transform: "translateY(-10%) rotate(0deg)", opacity: "0.8" },
          "100%": {
            transform: "translateY(110vh) rotate(360deg)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
