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
        background: "var(--background)",  // Background still uses variable
        foreground: "#000000",  // Use fixed black color for text
      },
      fontFamily: {
        sans: ['var(--font-work-sans)'],
        'league-spartan': ['var(--font-league-spartan)'],
      },
    },
  },
  plugins: [],
};
export default config;
