import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blog-black": "#222831",
        "blog-light-black": "#393E46",
        "blog-teal": "#00ADB5",
        "blog-dark-teal": "#00949b",
        "blog-grey": "#EEEEEE",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
