import { TAnalysisResult } from "@/app/me/(analyze)/type";
import FileAnalysisItem from "./FileAnalysisItem";

/**
 * `FileAnalysisList` 컴포넌트는 주어진 분석 결과 배열을 기반으로
 * 파일별 분석 결과를 나열합니다.
 * 각 파일의 이름, 코드, 분석 결과를 포함하는 항목들을 렌더링합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {TAnalysisResult[]} props.analysisResults - 분석 결과 배열
 * @returns {JSX.Element} - 파일 분석 리스트 구성 요소
 */
export default function FileAnalysisList({
  analysisResults,
}: {
  analysisResults: TAnalysisResult[];
}) {
  return (
    <>
      <main>
        <ul className="flex flex-col gap-8">
          {analysisResults.map((result: TAnalysisResult) => (
            <FileAnalysisItem
              key={result.sha}
              fileName={result.name}
              results={result.results}
            />
          ))}
        </ul>
      </main>
    </>
  );
}
