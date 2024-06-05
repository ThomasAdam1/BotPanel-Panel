/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#fff",
      darkGray: "#14181c",
      "menu-color": "#1e2328",
      muted: "#707a83",
    },
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    }
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          background: "#14181c",
          white: "#ffffff",
          primary: "#7480ff"
        }
      }
    ]
  },

  plugins: [
    require('daisyui'),
  ],
}

