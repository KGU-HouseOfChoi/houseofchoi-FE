module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      colors: {
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
        brand: {
          normal: "#FFB74D",
          hover: "#E6A545",
          active: "#CC923E",
        },
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
        semantic: {
          info: "#2196F3",
          neutral: "#BDBDBD",
        },
      },
    },
  },
};
