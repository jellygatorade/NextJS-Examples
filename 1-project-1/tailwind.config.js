/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/**/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      RobotoThin: ["Roboto-Thin"],
      RobotoLight: ["Roboto-Light"],
      RobotoRegular: ["Roboto-Regular"],
      // AlmendraDisplay: ["Almendra-Display"],
    },
    colors: {
      black: {
        off: "#0F0F0F",
        full: "#000000",
      },
      white: {
        off: "#F0F0F0",
        full: "#FFFFFF",
      },
      neutral: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E5E5",
        300: "#D4D4D4",
        400: "#A3A3A3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
    },
    extend: {
      opacity: {
        65: "65%",
      },
      rotate: {
        360: "360deg",
      },
      boxShadow: {
        "hamburger-bars": "0px 0px 1px #737373",
        "light-grey-3px": "0px 0px 3px #bbbbbb",
        // "black-3px": "0px 0px 3px #000000",
        // "black-4px": "0px 0px 4px #000000",
        // "black-5px": "0px 0px 5px #000000",
        // "black-10px": "0px 0px 10px #000000",
      },
    },
  },
  plugins: [],
};
