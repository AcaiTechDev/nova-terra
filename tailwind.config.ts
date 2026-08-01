import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terra: {
          50: "#fdf5ef",
          100: "#faead9",
          200: "#f3d1ae",
          300: "#ecb37c",
          400: "#e4914d",
          500: "#dd7530",
          600: "#c65a22",
          700: "#a4441f",
          800: "#84371f",
          900: "#6c2f1c",
          950: "#3a160c",
        },
        night: {
          900: "#141311",
          800: "#1e1c19",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Fraunces",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
