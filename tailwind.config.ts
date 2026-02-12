// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // Added all possible paths to ensure Tailwind scans your components correctly
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#1a1a1a",
        background: "#ffffff",
        foreground: "#1a1a1a",
        primary: {
          DEFAULT: "#1a1a1a",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#fafafa",
          foreground: "#1a1a1a",
        },
        muted: {
          DEFAULT: "#fafafa",
          foreground: "#666666",
        },
      },
      // This configures the "prose" class to use your specific grayscale colors
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1a1a1a",
            h1: { color: "#000000" },
            h2: { color: "#000000" },
            h3: { color: "#000000" },
            strong: { color: "#000000" },
            code: {
              color: "#1a1a1a",
              backgroundColor: "#f5f5f5",
              padding: "2px 4px",
              borderRadius: "4px",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // This enables the 'prose' class for Markdown
  ],
};

export default config;
