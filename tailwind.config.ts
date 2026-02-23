import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offBlack: "#111110",
        cream: "#f9f7f1",
        mutedGold: "#d4af37",
        sageGreen: "#8A9A5B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        editorial: ["var(--font-editorial)", "ui-serif", "Georgia", "serif"],
      },
    },
  },
};

export default config;
