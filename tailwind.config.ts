//tailwind.config.ts

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        pretendard: ["var(--font-pretendard)"],
      },
      animation: {
        rotateLeft: "rotateLeft 15s linear infinite",
        fadeIn: "fadeIn 7.5s ease-in forwards",
        ripple: "ripple 5s ease-out",
        "slide-right": "slide-right 120s linear infinite",
        slideIn: "slideIn 1s ease-out forwards",
      },
      keyframes: {
        rotateLeft: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        fadeIn: {
          "0%": {
            opacity: "0", // 완전히 투명
          },
          "100%": {
            opacity: "1", // 완전히 불투명
          },
        },
        ripple: {
          "0%": {
            transform: "scale(1.0)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(12.0)",
            opacity: "0",
          },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-300%)" },
          "100%": { transform: "translateX(-58%)" },
        },
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
          blue: "#99BDFF",
          10: "#E6E6E6", // 메인
          5: "#F3F3F3",
        },
        background: {
          purpleLight: "#FAF8FF",
          purpleDark: "#E3E1E7",
          redLight: "#FFEFEF",
          grayLight: "#F1F1F1",
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
  plugins: [
    plugin(function ({ addComponents }) {
      const filledBtn = {
        ".fill-radius-8px": {
          backgroundColor: "#6100FF",
          fontFamily: "inter",
          fontWeight: "600",
          borderRadius: "8px",
          padding: "8px 20px 8px 20px",
          color: "#ffffff",
        },
        ".fill-radius-999px": {
          backgroundColor: "#6100FF",
          fontFamily: "inter",
          fontWeight: "300",
          borderRadius: "999px",
          padding: "16px 24px 16px 24px",
          color: "#ffffff",
        },
      };
      const outlineBtn = {
        ".out-radius-8px": {
          backgroundColor: "#ffffff",
          fontFamily: "inter",
          fontWeight: "600",
          border: "1px solid #C9A8FF",
          borderRadius: "8px",
          padding: "8px 20px 8px 20px",
          color: "#6100FF",
        },
        ".out-radius-999px": {
          backgroundColor: "#ffffff",
          fontFamily: "inter",
          fontWeight: "300",
          border: "1px solid #C9A8FF",
          borderRadius: "999px",
          padding: "16px 24px 16px 24px",
          color: "#6100FF",
        },
      };
      const tonalBtn = {
        ".tonal-radius-8px": {
          backgroundColor: "#f2ebff",
          fontFamily: "inter",
          fontWeight: "600",
          borderRadius: "8px",
          padding: "8px 20px 8px 20px",
          color: "#6100FF",
        },
        ".tonal-radius-999px": {
          backgroundColor: "#f2ebff",
          fontFamily: "inter",
          fontWeight: "300",
          width: "121px",
          height: "56px",
          borderRadius: "999px",
          padding: "16px 24px 16px 24px",
          color: "#6100FF",
        },
      };
      addComponents(filledBtn);
      addComponents(outlineBtn);
      addComponents(tonalBtn);
    }),
  ],
};
export default config;
