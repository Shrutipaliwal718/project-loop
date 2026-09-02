import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        loop: {
          bg: "#030912",
          surface: "#091523",
          cyan: "#19e6d1",
          blue: "#28a9ff",
          purple: "#8b5cf6",
          violet: "#c45cff",
          green: "#35e879",
          amber: "#f6a723",
          red: "#ff4d72",
        },
      },

      boxShadow: {
        "loop-cyan": "0 0 35px rgba(25, 230, 209, 0.14)",

        "loop-purple": "0 0 35px rgba(139, 92, 246, 0.14)",
      },
    },
  },

  plugins: [],
};

export default config;
