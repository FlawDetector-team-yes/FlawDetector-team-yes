import { TRepositoryFiles, TSelectedFiles } from "@/app/me/(analyze)/type";
import fileImg from "../../../public/images/file.png";
import checkImg from "../../../public/images/check.png";
import Image from "next/image";
type TFileListItem = {
  file: TRepositoryFiles;
  isSelected: boolean;
  onClick: (file: TSelectedFiles) => void;
};
export default function FileListItem({
  file,
  isSelected,
  onClick,
}: TFileListItem) {
  return (
    <>
      <li
        key={file.id}
        onClick={() => onClick(file)}
        className={`${isSelected && "bg-[#E3E1E7]"} border-1 flex h-[44px] gap-1 border-[1px] border-[#E6E6E6] p-[10px] hover:cursor-pointer hover:bg-[#E3E1E7]`}
      >
        {isSelected && (
          <Image src={checkImg} alt="Check" width={24} height={24} />
        )}
        <Image src={fileImg} alt="File" width={24} height={24} />

        {file.fileName}
      </li>
    </>
  );
}
