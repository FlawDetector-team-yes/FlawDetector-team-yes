import { useEffect } from "react";
import {
  TFormattedRes,
  useAnalyzeFileResultStore,
  useFormattedResStore,
} from "@/store/useAnalyzeStore";
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
  const analyzeFileResult = useAnalyzeFileResultStore(
    (state) => state.analyzeFileResult,
  );
  const suggestRes = useFormattedResStore((state) => state.suggestRes);
  const securityRes = useFormattedResStore((state) => state.securityRes);
  const setSuggestRes = useFormattedResStore((state) => state.setSuggestRes);
  const setSecurityRes = useFormattedResStore((state) => state.setSecurityRes);

  useEffect(() => {
    // 데이터 설정
    extractData("")
  }, []);

  const extractData = (result: string) => {
    // 코드 넣어저 데이터 원하는 형식으로 뽑아내기
    // 정규식 패턴
    const titleRegex = /\d+\.\s(.+?)\n/g; // 타이틀 추출
    const descriptionRegex = /설명: (.+?)\n/g; // 설명 추출
    const codeRegex = /수정 코드: (.*?)```([\s\S]*?)```/g; // 코드 블록 추출
    const lineRegex = /수정 라인: (\d+)/g; // 라인 번호 추출

    const suggestTitleRegex = /교정 제안: (.+?)\n/g; // ESLint 제안 타이틀 추출
    const suggestDescriptionRegex = /설명: (.+?)\n/g; // ESLint 설명 추출
    const suggestCodeRegex = /교정 코드: (.*?)```([\s\S]*?)```/g; // ESLint 교정 코드 추출
    const suggestLineRegex = /교정 라인: (\d+)/g; // ESLint 라인 번호 추출

    // 추출된 데이터 배열
    const securityData: TFormattedRes[] = [];
    const suggestData: TFormattedRes[] = [];

    // 타이틀 추출
    let titles = [];
    let match;
    while ((match = titleRegex.exec(result)) !== null) {
      titles.push((match[1] || match[2]).trim());
    }

    // 설명 추출
    let descriptions = [];
    while ((match = descriptionRegex.exec(result)) !== null) {
      descriptions.push(match[0].trim());
    }

    // 코드 블록이 있는 경우 먼저 추출하고, 없으면 설명 뒤의 텍스트를 추출
    let codeBlocks = [];
    while ((match = codeRegex.exec(result)) !== null) {
      codeBlocks.push(match[1].trim());
    }

    // 라인 번호 추출
    let lines = [];
    while ((match = lineRegex.exec(result)) !== null) {
      lines.push(parseInt(match[1]));
    }

    // 보안 취약점 분석 결과 추출
    const extractSecurity = () => {
      while (true) {
        const titleMatch = titleRegex.exec(result);
        const descriptionMatch = descriptionRegex.exec(result);
        const codeMatch = codeRegex.exec(result);
        const lineMatch = lineRegex.exec(result);

        // 더 이상 일치하는 것이 없으면 종료
        if (!titleMatch || !descriptionMatch || !codeMatch || !lineMatch) {
          break;
        }

        // 보안 취약점 데이터를 배열에 저장
        securityData.push({
          title: titleMatch[1].trim(),
          description: descriptionMatch[1].trim(),
          code: codeMatch[1].trim(),
          line: parseInt(lineMatch[1]),
        });
      }
    };

    // ESLint 교정 제안 결과 추출
    const extractSuggestions = () => {
      while (true) {
        const titleMatch = suggestTitleRegex.exec(result);
        const descriptionMatch = suggestDescriptionRegex.exec(result);
        const codeMatch = suggestCodeRegex.exec(result);
        const lineMatch = suggestLineRegex.exec(result);

        // 더 이상 일치하는 것이 없으면 종료
        if (!titleMatch || !descriptionMatch || !codeMatch || !lineMatch) {
          break;
        }

        // ESLint 교정 제안 데이터를 배열에 저장
        suggestData.push({
          title: titleMatch[1].trim(),
          description: descriptionMatch[1].trim(),
          code: codeMatch[1].trim(),
          line: parseInt(lineMatch[1]),
        });
      }
    };

    // 보안 취약점과 ESLint 교정 제안 데이터 추출
    extractSecurity();
    extractSuggestions();

    // Zustand 스토어에 저장
    setSecurityRes(securityData);
    setSuggestRes(suggestData);
  };

  console.log(securityRes);
  console.log(suggestRes);

  return (
    <>
      <main className="h-full overflow-scroll overflow-x-hidden">
        <ul className="overflow flex flex-col gap-8">
          {/** 분석 파일 리스트 */}
          <Infobox type="security" />
          <Infobox type="suggest" />
        </ul>
      </main>
    </>
  );
}
