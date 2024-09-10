import AnalyzeHeader from "@/components/analyze/AnalyzeHeader";
import { SessionProvider } from "next-auth/react";
import { getSession } from "@/lib/getSession";
import FileAnalysisListContainer from "@/components/analyze/ai-analyze/FileAnalysisListContainer";

/**
 * `AiAnalyzePage` 컴포넌트는 파일 분석 페이지를 렌더링합니다.
 * 페이지 상단에는 페이지 제목과 아이콘이 포함되어 있으며,
 * 사이드바에는 파일 목록이 표시되고, 본문에는 코드와 분석 결과가 나타납니다.
 *
 * @returns JSX.Element - 페이지 구성 요소.
 */
async function AiAnalyzePage() {
  const session = await getSession();
  return (
    <div className="container mx-auto flex min-w-[1760px] flex-col gap-[45px]">
      {/* 페이지 헤더 */}
      <section className="flex h-[79px] w-full items-center gap-6 rounded-full border-4 border-primary-500 p-5 text-primary-500">
        <AnalyzeHeader />
      </section>
      <section className="flex gap-8">
        <SessionProvider session={session}>
          <FileAnalysisListContainer />
        </SessionProvider>
      </section>
    </div>
  );
}

export default AiAnalyzePage;
