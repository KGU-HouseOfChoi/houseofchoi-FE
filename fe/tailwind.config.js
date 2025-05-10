/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        // Grayscale
        grayscale: {
          0: "#FFFFFF",
          5: "#F8F8F8",
          10: "#F0F0F0",
          20: "#E4E4E4",
          30: "#D8D8D8",
          40: "#C6C6C6",
          50: "#8E8E8E",
          60: "#717171",
          70: "#555555",
          80: "#2D2D2D",
          90: "#1D1D1D",
          100: "#000000",
        },

        // Main 브랜드 컬러
        brand: {
          normal: "#FFB74D",
          hover: "#E6A545",
          active: "#CC923E",
        },

        // 상태 컬러
        danger: {
          50: "#F73A2C",
          60: "#CF2F24",
        },
        success: {
          50: "#3A91EA",
          60: "#2F79C4",
        },
        warning: {
          50: "#FFC63F",
          60: "#E3AE32",
        },

        // Semantic Text Color
        textColor: {
          heading: "#1D1D1D", // grayscale-90
          body: "#555555", // grayscale-70
          sub: "#8E8E8E", // grayscale-50
          disabled: "#C6C6C6", // grayscale-40
          white: "#FFFFFF",
        },

        // Background Color
        bgColor: {
          default: "#FFFFFF", // grayscale-0
          light: "#F8F8F8", // grayscale-5
          surface: "#F0F0F0", // grayscale-10
          deep: "#2D2D2D", // grayscale-80
        },

        // Icon Color
        iconColor: {
          default: "#717171", // grayscale-60
          sub: "#8E8E8E", // grayscale-50
          disabled: "#D8D8D8", // grayscale-30
        },

        // Border Color
        borderColor: {
          default: "#E4E4E4", // grayscale-20
          strong: "#D8D8D8", // grayscale-30
          focus: "#FFB74D", // brand.normal
        },

        // Semantic 그룹
        semantic: {
          info: "#2196F3",
          neutral: "#BDBDBD",
        },
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
