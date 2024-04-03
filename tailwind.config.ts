import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      gray100: '#e6e6e6',
      gray200: '#cdcdcd',
      gray300: '#a6a6a6',
      gray400: '#7d7d7d',
      gray500: '#4e4e4f',
      black: '#262626',
      red: '#ff3b31',
      orange: '#ff9503',
      yellow: '#ffcb00',
      green: '#19c758',
      lightblue: '#52aaf2',
      blue: '#027bff',
      deepblue: '#5756d7',
      pink: '#ea426a',
      purple: '#c078dc',
      brown: '#9d8563',
      gray: '#5c6670',
      pinkbeige: '#d9a59e',
    },
    screen: {
      pc: '570px',
    },
    fontSize: {
      sm: '12px',
      base: '14px',
    }
  },
  plugins: [],
};
export default config;
