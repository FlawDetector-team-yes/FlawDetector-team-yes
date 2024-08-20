import { TAnalysisResult } from "@/app/me/(analyze)/type";
import Image from "next/image";
import fileImg from "../../../../public/images/file.png";

/**
 * `FileAnalysisSideBar` 컴포넌트는 사이드바에 분석 파일 목록을 표시합니다.
 * 각 파일은 아이콘과 함께 파일 이름이 나열됩니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {TAnalysisResult[]} props.analysisResults - 분석 결과 배열
 * @returns {JSX.Element} - 사이드바 파일 목록 구성 요소
 */
export default function FileAnalysisSideBar({
  analysisResults,
}: {
  analysisResults: TAnalysisResult[];
}) {
  return (
    <>
      <aside>
        <ul className="w-[247px] rounded-sm">
          {analysisResults.map((result: TAnalysisResult) => (
            <li
              key={result.id}
              className="flex h-[44px] gap-1 border-[1px] border-t-0 border-[#C3C3C3] p-2 first:rounded-t-md first:border-t last:rounded-b-md"
            >
              <Image src={fileImg} alt="File" width={24} height={24} />
              <span>{result.fileName}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
