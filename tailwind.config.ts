import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "deep-navy": "var(--color-deep-navy)",
        "midnight-navy": "var(--color-midnight-navy)",
        "lumience-blue": "var(--color-lumience-blue)",
        "bright-blue": "var(--color-bright-blue)",
        "light-blue": "var(--color-light-blue)",
        "lumience-purple": "var(--color-lumience-purple)",
        "light-purple": "var(--color-light-purple)",
        "off-white": "var(--color-off-white)",
        "dark-text": "var(--color-dark-text)",
        "soft-gray": "var(--color-soft-gray)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        "glow-blue":
          "0 0 25px rgba(8, 124, 245, 0.5), 0 0 50px rgba(8, 124, 245, 0.2)",
        "glow-blue-sm":
          "0 0 15px rgba(8, 124, 245, 0.4), 0 0 30px rgba(8, 124, 245, 0.15)",
        "glow-purple":
          "0 0 25px rgba(116, 56, 212, 0.5), 0 0 50px rgba(116, 56, 212, 0.2)",
        "glow-purple-sm":
          "0 0 15px rgba(116, 56, 212, 0.4), 0 0 30px rgba(116, 56, 212, 0.15)",
        "glass-subtle": "0 8px 32px rgba(0, 0, 0, 0.12)",
      },
      backgroundImage: {
        "gradient-blue":
          "linear-gradient(135deg, var(--color-lumience-blue), var(--color-bright-blue))",
        "gradient-purple":
          "linear-gradient(135deg, var(--color-lumience-blue), var(--color-lumience-purple))",
        "gradient-divider":
          "linear-gradient(90deg, transparent, var(--color-lumience-blue), var(--color-lumience-purple), transparent)",
      },
      backdropBlur: {
        glass: "16px",
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;