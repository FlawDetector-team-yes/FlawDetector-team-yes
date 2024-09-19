import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Gnb from "@/components/common/Gnb";
import Footer from "@/components/common/Footer";
import ModalProvider from "@/components/modal/ModalProvider";
import { SessionProvider } from "next-auth/react";
import { getSession } from "@/lib/getSession";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  preload: false,
});

export const metadata: Metadata = {
  verification: {
    google: "PzhWXZjlHrXotb_thskWaz0x2z0r6nf9NzGOMXBcIqA",
    other: {
      "naver-site-verification": "427e28e912f5e1728ee62411dc97d1db21d26441",
    },
  },
  title: {
    template: "%s | 플로디텍터",
    default: "플로디텍터",
  },
  description:
    "인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.",
  keywords: [
    "코드 취약점 분석",
    "보안 플랫폼",
    "GitHub 코드 보안 검사",
    "Next.js 보안",
    "코드 보안 최신 이슈",
    "취약점 탐지",
    "FlawDetector",
  ],
  applicationName: "플로디텍터",
  openGraph: {
    title: "AI기반 코드 보안 취약점 분석 플랫폼 | 플로디텍터",
    description:
      "인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.",
    url: "https://flaw-detector-team-yes-seven.vercel.app/",
    siteName: "플로디텍터",
    images: [
      {
        url: "https://flaw-detector-team-yes-seven.vercel.app/images/flawdetector-thumbnail.png", // 반드시 절대 URL이어야 함
        width: 1800,
        height: 1600,
        alt: "FlawDetector Thumbnail",
      },
    ],
    type: "website",
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "180x180",
      url: "/images/bug-favicon.png",
    },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="ko">
      <body className={`${inter.className} ${pretendard.variable} relative`}>
        <NextTopLoader />
        <Gnb />
        <SessionProvider session={session}>
          <ModalProvider />
        </SessionProvider>
        {children}
        <Footer />
      </body>
    </html>
  );
}
