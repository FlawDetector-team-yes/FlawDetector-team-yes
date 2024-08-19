import Image from "next/image";
import CodeArea from "../CodeArea";
import Infobox from "../Infobox";
import folderOpenImg from "../../../../public/images/folder-open.png";

/**
 * `FileAnalysisItem` 컴포넌트는 단일 파일의 분석 결과를 표시합니다.
 * 파일 이름, 코드, 그리고 분석 결과를 포함하여 렌더링합니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.fileName - 파일 이름
 * @param {string} props.code - 파일 코드
 * @param {Object[]} props.results - 분석 결과 배열
 * @returns {JSX.Element} - 파일 분석 항목 구성 요소
 */
export default function FileAnalysisItem({
  fileName,
  code,
  results,
}: {
  fileName: string;
  code: string;
  results: { code: string; coment: string }[];
}): JSX.Element {
  return (
    <li className="flex w-full flex-col gap-3 rounded-lg">
      <div className="flex h-[40px] items-center gap-3 rounded-lg text-[23px]">
        <Image src={folderOpenImg} alt="Folder Open" width={30} height={30} />
        <span>{`sfacweb-1/${fileName}`}</span>
      </div>
      <div className="flex w-full gap-7">
        <CodeArea type="select" fileCode={code} />
        <Infobox results={results} />
      </div>
    </li>
  );
}
