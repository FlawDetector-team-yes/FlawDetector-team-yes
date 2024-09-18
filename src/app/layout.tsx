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
  title: "FlawDetector",
  description:
    "인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.",
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
