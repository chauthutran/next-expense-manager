import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#E4EDED",
        "bright-lime-green": "#89fa19",
        'gold': '#FFD700',
        "gainsboro": "#E4EDED",


        'light-coral': "#fc7e6e", // Header
        'warm-gray': '#A9A9A9',
        'deep-coral': "#D96A5B", // Footer
        'soft-peach': "#FFD3B4", // Primary Button
        'muted-salmon': "#FFAD91", // Secondary Button
        "teal-green": "#2A9D8F", // Accent Button:
        "light-sand": "#F4EDE8", // Background
        'soft-pink': '#FFB6C1',

        'soft-coral': "##fff6f5",
        'tiffany-blue': '#23aaa6',
        
        'living-coral': '#FF6F61',
        'ultra-violet': '#6A0DAD',
        'pale-yellow': '#FFFACD',
        'bright-yellow': '#FFD700',
        'mint-green': '#98FF98',
        'sky-blue': '#87CEEB',
        'dark-teal': '#008080',
        'sunset-orange': '#FD5E53',
        'slate-blue': '#6A5ACD',
      },
    },
  },
  plugins: [],
};
export default config;
