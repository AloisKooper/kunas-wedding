import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair-display': ['var(--font-playfair)'],
        'montserrat': ['var(--font-montserrat)'],
        'cormorant': ['var(--font-cormorant)'],
        'great-vibes': ['var(--font-great-vibes)'],
        'sail': ['var(--font-sail)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        wedding: {
          primary: '#C37200',  // The ampersand color
          section: {
            light: '#FBF7F4',  // Primary section background
            alternate: '#FAF3EF',  // Alternate section background
          },
          text: {
            dark: '#2C1810',  // Main text color for sections
          }
        }
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config;
