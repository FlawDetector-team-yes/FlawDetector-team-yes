import { TFile, TSelectedFiles } from "@/app/me/(analyze)/type";
import fileImg from "../../../public/images/file.png";
import checkImg from "../../../public/images/check.png";
import Image from "next/image";

type TFileListItemProps = {
  file: TFile;
  isSelected: boolean;
  onClick: (file: TSelectedFiles) => void;
};

/**
 * FileListItem 컴포넌트는 파일 항목을 렌더링하며, 선택 상태와 클릭 핸들러를 지원합니다.
 * @param {TFileListItemProps} props - 컴포넌트 속성
 * @param {TFile} props.file - 파일 정보 객체
 * @param {boolean} props.isSelected - 항목의 선택 상태
 * @param {(file: TSelectedFiles) => void} props.onClick - 클릭 이벤트 핸들러
 */
function FileListItem({ file, isSelected, onClick }: TFileListItemProps) {
  return (
    <li
      onClick={() => onClick(file)}
      className={`flex h-[44px] cursor-pointer items-center gap-2 border border-[#E6E6E6] p-2 ${
        isSelected ? "bg-[#E3E1E7]" : "hover:bg-[#E3E1E7]"
      }`}
    >
      {isSelected && (
        <Image src={checkImg} alt="Selected" width={24} height={24} />
      )}
      <Image src={fileImg} alt="File" width={24} height={24} />
      <span className="text-base text-[#3F3F3F]">{file.fileName}</span>
    </li>
  );
}
export default FileListItem;
