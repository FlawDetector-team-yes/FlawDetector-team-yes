import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        neutral: {
          100: "#030303",
          90: "#1A1A1A",
          80: "#333333",
          70: "#4D4D4D",
          60: "#4D4D4D",
          50: "#808080",
          40: "#999999", // 메인 타이틀
          30: "#B3B3B3", // 서브타이틀, 본문, 버튼텍스트
          20: "#CCCCCC", // 안내, 설명
          10: "#E6E6E6", // 중요도 낮은 안내, 설명
          5: "#F3F3F3",
        },
        primary: {
          500: "#6100FF", // 메인타이틀
          400: "#883EFF", // 서브타이틀, 본문, 버튼 텍스트
          300: "#A66FFF", // 안내, 설명
          200: "#C9A8FF", // 중요도 낮은 안내, 설명
          100: "#E0CEFF",
          50: "#F2EBFF",
        },
        stroke: {
          blue: "99BDFF",
          10: "#E6E6E6", // 메인
          5: "#F3F3F3",
        },
        background: {
          purpleLight: "#FAF8FF",
          purpleDark: "#E3E1E7",
          redLight: "#FFEFEF",
          grayLight: "F1F1F1",
          grayDark: "#C2C2C2",
        },
        system: {
          warning: "#FF6D6D",
          assist: "#6DB0FF",
          suggest: "#FFD542",
          success: "#00C308",
        },
      },
    },
  },
  plugins: [],
};
export default config;
