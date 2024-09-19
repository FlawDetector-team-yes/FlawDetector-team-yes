import { TSelectedFiles } from "@/app/me/repos/type";
import fileImg from "../../../../public/images/file.png";
import Image from "next/image";
import { useAnalyzeFilesStore } from "@/store/useAnalyzeStore";

/**
 * 모달 파일 리스트 아이템을 표시하는 컴포넌트입니다.
 *
 * @component
 * @param {Object} props - 컴포넌트에 전달되는 속성입니다.
 * @param {TSelectedFiles} props.file - 파일 정보 객체입니다.
 * @param {number} props.idx - 파일 아이템의 인덱스입니다.
 * @returns {JSX.Element} 파일 정보를 표시하는 리스트 아이템을 포함하는 UI 요소입니다.
 */
export default function ModalFileListItem({
  file,
  idx,
}: {
  file: TSelectedFiles;
  idx: number;
}) {
  const analyzeFiles = useAnalyzeFilesStore((state) => state.analyzeFiles);
  const fileProgress = analyzeFiles.find((p) => p.fileId === file.sha);

  return (
    <>
      <li
        key={file.sha}
        className={`${
          idx === 0 && "rounded-t-[1px]"
        } flex h-[44px] items-center justify-between border-[1px] border-[#E6E6E6] px-2`}
      >
        <div className="flex h-[24px] w-[250px] gap-2">
          <Image src={fileImg} width={24} height={24} alt="파일 아이콘" />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base">
            {file.name}
          </span>
        </div>

        <div className="flex w-[50%] items-center justify-end gap-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-100">
            <div
              className="h-2.5 rounded-full bg-system-success"
              style={{ width: `${fileProgress?.progressValue || 0}%` }}
            ></div>
          </div>
          <span>{fileProgress?.progressValue || 0}%</span>
        </div>
      </li>
    </>
  );
}
