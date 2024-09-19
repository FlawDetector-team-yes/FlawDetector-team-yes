import Image from "next/image";
import leftVioletArrow from "../../../../../public/images/left-violet-arrow.png";
import AnalysisWrapper from "@/components/analyze/AnalysisWrapper";
import { SessionProvider } from "next-auth/react";
import { getSession } from "@/lib/getSession";
import { Metadata } from "next";
import AnalyzeHeader from "@/components/analyze/AnalyzeHeader";

/**
 * `AnalyzePage` 컴포넌트는 분석 페이지의 레이아웃을 구성합니다.
 * 페이지 상단에는 헤더가 포함되어 있으며, 분석 콘텐츠를 래핑하는 `AnalysisWrapper` 컴포넌트를 렌더링합니다.
 *
 * @returns {JSX.Element} - 분석 페이지 구성 요소
 */

export const metadata: Metadata = {
  title: "Analyze",
  description:
    "인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.",
};

async function AnalyzePage() {
  const session = await getSession();
  console.log("AnalyzePage");
  return (
    <div className="container mx-auto flex min-w-[1760px] flex-col gap-[45px]">
      {/* 헤더 섹션 */}
      <header className="flex h-[79px] w-full items-center gap-6 rounded-full border-4 border-primary-500 p-5 text-primary-500">
        <AnalyzeHeader />
      </header>
      {/* 분석 콘텐츠 */}
      <SessionProvider session={session}>
        <AnalysisWrapper />
      </SessionProvider>
    </div>
  );
}

export default AnalyzePage;
