import Image from "next/image";
import magnifier from "../../../public/images/magnifier.png";
import folderDashed from "../../../public/images/folder-dashed.png";
import bugImg from "../../../public/images/bug.svg";
import reload from "../../../public/images/reload.png";

const MESSAGES = {
  visible: "파일을 선택하세요",
  hidden: "분석할 파일이 없어요!",
};
const ICONS = {
  visible: magnifier,
  hidden: folderDashed,
};
const ALT_TEXT = {
  visible: "Magnifier",
  hidden: "Folder Dashed",
};
const ANALYZE_TYPE = (
  <div className="absolute top-1/2 z-20 flex flex-col items-center justify-center gap-11">
    <Image src={bugImg} alt="Bug" width={79} height={81} />
    <span className="text-[32px] font-bold">분석 대기중</span>
  </div>
);

/**
 * `TCodeAreaProps` 타입 정의
 * @typedef {Object} TCodeAreaProps
 * @property {string} type - 코드 영역의 상태를 나타냅니다.
 *   - `select`: 파일이 선택된 상태
 *   - `analyze`: 분석 대기 중인 상태
 * @property {string} fileCode - 출력할 파일 코드 부분입니다.
 */
export type TCodeAreaProps = {
  type: string;
  fileCode: string;
};

/**
 * 코드 영역을 표시하는 컴포넌트입니다.
 * - `type`이 `"select"`일 경우: 파일 선택된 상태를 나타내는 추가 내용을 렌더링합니다.
 * - `type`이 `"analyze"`일 경우: 분석 대기 중 상태를 나타내는 추가 내용을 렌더링합니다.
 *
 * @param {TCodeAreaProps} props - 컴포넌트의 프로퍼티
 * @param {string} props.type - 코드 영역의 상태를 나타냅니다.
 * @param {string} props.fileCode - 출력할 파일 코드 부분입니다.
 *
 * @returns {JSX.Element} 코드 영역 컴포넌트
 */

const CodeArea = ({ type, fileCode }: TCodeAreaProps) => {
  const text = type === "select" ? MESSAGES.visible : MESSAGES.hidden;
  const codeAlt = type === "select" ? ALT_TEXT.visible : ALT_TEXT.hidden;
  const Icon = ICONS[type === "select" ? "visible" : "hidden"];
  const color = type === "select" ? "text-primary-500" : "";
  const code = fileCode || "";
  const isSelected = Boolean(fileCode);
  const isAnalyzed = type !== "select" ? "blur-sm" : "";

  return (
    <div
      className={`${!isSelected && "justify-center"} flex h-[976px] w-1/2 flex-col items-center gap-8 rounded-lg border-[1px] border-[#C3C3C3] px-10 py-11`}
    >
      {isSelected ? (
        // 파일 선택
        <div className="relative flex flex-col items-center justify-center gap-10">
          {type === "analyze" && ANALYZE_TYPE}
          <div
            className={`${isAnalyzed} flex flex-col items-center justify-center gap-6`}
          >
            <Image src={reload} alt="Success" width={44} height={44} />
            <div className="gap flex h-[50px] w-[550px] justify-center rounded-lg border-[1px] border-primary-500 bg-[#F2EBFF] p-3 text-center text-xl font-[600] text-primary-500">
              취약성 검사 코드
            </div>
          </div>
          <p className={isAnalyzed}>{code}</p>
        </div>
      ) : (
        // 파일 미선택
        <>
          <Image src={Icon} alt={codeAlt} width={48} height={48} />
          <span className={`text-[32px] font-[500] ${color}`}>{text}</span>
        </>
      )}
    </div>
  );
};

export default CodeArea;
