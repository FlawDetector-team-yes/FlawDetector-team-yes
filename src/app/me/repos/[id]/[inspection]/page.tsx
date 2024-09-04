import Image from "next/image";
import leftVioletArrow from "../../../../../public/images/left-violet-arrow.png";
import FileAnalysisSideBar from "@/components/analyze/ai-analyze/FileAnalysisSideBar";
import FileAnalysisList from "@/components/analyze/ai-analyze/FileAnalysisList";
//import { analysisResults } from "../data";

/**
 * `AiAnalyzePage` 컴포넌트는 파일 분석 페이지를 렌더링합니다.
 * 페이지 상단에는 페이지 제목과 아이콘이 포함되어 있으며,
 * 사이드바에는 파일 목록이 표시되고, 본문에는 코드와 분석 결과가 나타납니다.
 *
 * @returns JSX.Element - 페이지 구성 요소.
 */
function AiAnalyzePage() {
  return (
    <div className="container mx-auto flex min-w-[1760px] flex-col gap-[45px]">
      {/* 페이지 헤더 */}
      <section className="flex h-[79px] w-full items-center gap-6 rounded-full border-4 border-primary-500 p-5 text-primary-500">
        <Image
          src={leftVioletArrow}
          alt="Left Violet Arrow"
          width={36}
          height={36}
        />
        <p className="flex items-center text-[38px] font-medium">sfacweb - 1</p>
      </section>
      <section className="flex gap-8">
        <FileAnalysisSideBar />
        <FileAnalysisList />
      </section>
    </div>
  );
}

export default AiAnalyzePage;
