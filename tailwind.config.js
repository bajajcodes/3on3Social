// eslint-disable-next-line no-undef
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    screens: {
      md: "500px",
      lg: "768px",
    },
    extend: {
      colors: {
        "primary-cta": "#17BBD8",
        white: "#FFFFFF",
        "primary-background": "#F7F7F7",
        "fill-background": "#C4C4C4",
        "muted-text": "#9A9A9A",
      },
    },
  },
  plugins: [],
};
