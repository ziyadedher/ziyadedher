import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {},
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("flowbite/plugin")],
};

export default config;