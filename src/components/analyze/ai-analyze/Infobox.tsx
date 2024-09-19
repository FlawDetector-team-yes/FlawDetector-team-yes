import Image from "next/image";
import circleGreen from "../../../../public/images/circle-green.png";
import triangleYellow from "../../../../public/images/triangle-yellow.png";
import XRed from "../../../../public/images/x-mark-error.png";
import errorImg from "../../../../public/images/triangle-error.png";
import copyImg from "../../../../public/images/copy.png";
import ModifiedCode from "./ModifiedCode";
import { TFormattedRes, useErrorMsgStore } from "@/store/useAnalyzeStore";
import { NoDataMsg } from "./anlaysisResultMsg";

/**
 * Infobox 컴포넌트는 분석 결과를 보여주는 박스입니다.
 * @param {Object[]} results - 분석 결과 배열
 * @param {string} results[].code - 코드 텍스트
 * @param {string} results[].coment - 주석 텍스트
 */
function Infobox({
  type,
  resData,
}: {
  type: "security" | "suggest" | "nodata" | "error";
  resData: TFormattedRes;
}) {
  const errorMsg = useErrorMsgStore((state) => state.errorMsg);

  // 코드 복사 로직
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <li
      className={`flex flex-col gap-3 rounded-lg border p-5 ${type === "security" || type === "error" ? "border-system-warning/20 bg-system-warning/10" : type === "suggest" ? "border-system-suggest/20 bg-system-suggest/10" : "border-gray-200 bg-[#f5f5f5]"}`}
    >
      <div className="flex items-center gap-3">
        {type === "security" ? (
          <Image src={XRed} alt="Error Indicator" width={20} height={20} />
        ) : type === "suggest" ? (
          <Image
            src={triangleYellow}
            alt="Triangle Indicator"
            width={20}
            height={20}
          />
        ) : type === "error" ? (
          <Image src={errorImg} alt="Error Indicator" width={20} height={20} />
        ) : (
          <Image
            src={circleGreen}
            alt="Circle Indicator"
            width={20}
            height={20}
          />
        )}
        <div
          className={`flex gap-3 text-[22px] font-semibold ${type === "security" || type === "error" ? "text-system-warning" : type === "suggest" ? "text-system-suggest" : "text-[#525252]"}`}
        >
          {/* 제목 */}
          <p>
            {type === "nodata"
              ? NoDataMsg.title
              : type === "error"
                ? errorMsg.title
                : resData.title}
          </p>
          {/* 수정된 위치 - 클릭 시 해당 위치로 보내주기 */}
          <button
            className={`rounded-full border px-2 py-0 text-[18px] ${type === "security" ? "border-system-warning" : type === "suggest" ? "border-system-suggest" : "hidden"}`}
          >
            위치보기
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {/* 검출된 부분 설명 */}
        <p
          className={`text-[17px] ${type === "error" ? "text-system-warning" : "text-[#3F3F3F]"}`}
        >
          {type === "nodata"
            ? NoDataMsg.msg
            : type === "error"
              ? errorMsg.msg
              : resData.description}
        </p>
        {type !== "nodata" && type !== "error" && (
          <div className="flex flex-col gap-3">
            <h1 className="text-[20px]">수정된 코드</h1>
            <div className="relative">
              {/* 수정된 코드 */}
              <ModifiedCode code={resData.code} />
              {/* 코드 복사 버튼 */}
              <button
                className="absolute right-4 top-3 flex gap-1"
                onClick={() => handleCopyCode(resData.code)}
              >
                <Image src={copyImg} alt="copy" />
                <span className="text-gray-300">코드복사</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
export default Infobox;
