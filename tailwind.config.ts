import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      xxl: "1370px",
      // => @media (min-width: 1366px) { ... }
      "2xl": "1760px",
      // => @media (min-width: 1760px) { ... }
      "3xl": "1920px",
    },
    extend: {
      colors: {
        primary: {
          50: "#E6EFFC",
          100: "#B4CEF7",
          200: "#9BBEF4",
          300: "#689EEE",
          400: "#367DE9", 
          500: "#045DE3",
          600: "#034AB6",
          700: "#034AB6",
          800: "#02255B",
          900: "#00143F",
          950: "#000A27"
        },
        neutral: {
          50: "#F6F7F8",
          100: "#D0D3D7",
          200: "#C1C4CA",
          300: "#A3A8B1",
          400: "#878D98",
          500: "#6B7280",
          600: "#5C626E",
          700: "#4E535D",
          800: "#32363D",
          900: "#181B1F",
          950: "#000101"
        },
      },
      fontSize: {
        // Please base this on https://type-scale.com
        // Also, useful - https://nekocalc.com/px-to-rem-converter
        // @note: Base font is 18px - set in basics.css
        "xxs": "0.625rem",
        xs: "0.75rem",
        sm: "1rem",
        md: "1.125rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2.25rem",
        "3xl": "2.5rem",
        "4xl": "4rem",
        "5xl": "5.625rem",
        "6xl": "15rem",
      },
      fontFamily: {
        primary: "Poppins Regular, sans-serif",
        primaryBold: "Poppins Bold, sans-serif",
        primarySemiBold: "Poppins SemiBold, sans-serif"
      },
    },
  },
  plugins: [],
} satisfies Config;
