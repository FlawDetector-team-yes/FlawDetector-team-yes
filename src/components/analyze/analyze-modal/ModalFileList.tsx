"use client";
import useSelectedFilesStore from "@/store/useSelectedFilesStore";
import ModalFileListItem from "./ModalFileListItem";
import { useParams } from "next/navigation";

/**
 * 선택된 파일 목록을 표시하는 컴포넌트입니다.
 *
 * @component
 * @returns {JSX.Element} 선택된 파일 목록을 포함하는 UI 요소입니다.
 */
export default function ModalFileList() {
  // 선택된 파일들을 가져옵니다.
  const selectedFiles = useSelectedFilesStore((state) => state.selectedFiles);
  const params = useParams<{ id: string }>();
  const repoName = params.id;
  return (
    <>
      <ul className="h-[220px] w-[590px] overflow-y-auto rounded-lg border-[1px] border-[#C3C3C3]">
        {selectedFiles
          .filter((file) => file.repoName === repoName)
          .map((file, idx) => (
            <ModalFileListItem key={file.sha} file={file} idx={idx} />
          ))}
      </ul>
    </>
  );
}
