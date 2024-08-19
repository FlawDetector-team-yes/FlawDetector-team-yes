import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/globals.css";
import Gnb from "@/components/common/Gnb";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlawDetector",
  description:
    "인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Gnb />
        {children}
        <Footer />
      </body>
    </html>
  );
}
