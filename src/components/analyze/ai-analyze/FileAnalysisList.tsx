import { useFormattedResStore } from "@/store/useAnalyzeStore";
import Infobox from "./Infobox";

/**
 * `FileAnalysisList` 컴포넌트는 주어진 분석 결과 배열을 기반으로
 * 파일별 분석 결과를 나열합니다.
 * 각 파일의 이름, 코드, 분석 결과를 포함하는 항목들을 렌더링합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {TAnalysisResult[]} props.analysisResults - 분석 결과 배열
 * @returns {JSX.Element} - 파일 분석 리스트 구성 요소
 */
export default function FileAnalysisList() {
  const suggestRes = useFormattedResStore((state) => state.suggestRes);
  const securityRes = useFormattedResStore((state) => state.securityRes);

  return (
    <>
      <main className="h-full overflow-scroll overflow-x-hidden">
        <ul className="overflow flex flex-col gap-8">
          {/** 분석 파일 리스트 */}
          {securityRes.map((data) => (
            <Infobox type="security" resData={data} key={data.title} />
          ))}
          {suggestRes.map((data) => (
            <Infobox type="suggest" resData={data} key={data.title} />
          ))}
        </ul>
      </main>
    </>
  );
}
