import daisyui from "daisyui"

const darkModeConfig = {
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        dark: "#333",
      },
      textColor: {
        dark: "#fff",
      },
      screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				'3xl': '1920px',
				'4xl': '2560px',
			},
    },
  },
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
  ...darkModeConfig,
}
