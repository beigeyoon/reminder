import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      gray10: '#f5f5f5',
      gray100: '#e6e6e6',
      gray200: '#cdcdcd',
      gray300: '#a6a6a6',
      gray400: '#7d7d7d',
      gray500: '#4e4e4f',
      black: '#262626',
      blue: '#459fff',
      RED: '#ff3b31',
      ORANGE: '#ff9503',
      YELLOW: '#ffcb00',
      GREEN: '#19c758',
      LIGHTBLUE: '#52aaf2',
      BLUE: '#027bff',
      DEEPBLUE: '#5756d7',
      PINK: '#ea426a',
      PURPLE: '#c078dc',
      BROWN: '#9d8563',
      GRAY: '#5c6670',
      PINKBEIGE: '#d9a59e',
    },
    screen: {
      pc: '570px',
    },
    fontSize: {
      sm: '12px',
      base: '14px',
      lg: '18px',
    }
  },
  plugins: [],
};
export default config;
