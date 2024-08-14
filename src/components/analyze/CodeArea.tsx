import Image from "next/image";
import magnifier from "../../../public/images/magnifier.png";
import folderDashed from "../../../public/images/folder-dashed.png";
import bugImg from "../../../public/images/bug.svg";

import { TSelectedFiles } from "@/app/me/(analyze)/type";

export type TCodeAreaProps = {
  type: string;
  selectedFiles: TSelectedFiles[];
};

export default function CodeArea({ type, selectedFiles }: TCodeAreaProps) {
  let text = type === "select" ? "파일을 선택하세요" : "분석할 파일이 없어요!";
  let codeAlt = type === "select" ? "Magnifier" : "Folder Dashed";
  let Icon = type === "select" ? magnifier : folderDashed;
  let color = type === "select" ? "text-primary-500" : "";
  let code =
    selectedFiles.length > 0
      ? selectedFiles[selectedFiles.length - 1].code
      : "";
  let isSelected = selectedFiles.length > 0;
  let blur = type !== "select" ? "blur-sm" : "";

  return (
    <>
      <div className="min-y-[976px] flex min-w-[730px] flex-col items-center justify-center gap-8 rounded-lg border-[1px] border-[#C3C3C3]">
        {isSelected ? (
          <div className="relative flex items-center justify-center">
            {type !== "select" && (
              <div className="left absolute z-20 flex flex-col items-center justify-center gap-11">
                <Image src={bugImg} alt="Bug" width={79} height={81} />
                <span className="text-[32px] font-bold">분석 대기중</span>
              </div>
            )}
            <p className={blur}>{code}</p>
          </div>
        ) : (
          <>
            <Image src={Icon} alt={codeAlt} width={48} height={48} />
            <span className={`text-[32px] font-[500] ${color}`}>{text}</span>
          </>
        )}
      </div>
    </>
  );
}
