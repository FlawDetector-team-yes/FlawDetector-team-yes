"use client";

import { useEffect } from "react";
import leftArrowImg from "../../../public/images/left-arrow-pagination.png";
import FileListItem from "./FileListItem";
import useSelectedFilesStore from "@/store/useSelectedFilesStore";
import useFilesStore from "@/store/useFilesStore";
import Image from "next/image";
import { TGithubContent } from "@/app/me/repos/type";
import { useParams } from "next/navigation";
import useUserStore from "@/store/useUserStore";

/**
 * `FileList` 컴포넌트는 파일 목록을 렌더링하는 역할을 합니다.
 * 각 파일 항목은 선택된 상태에 따라 스타일이 다르게 적용되며,
 * 사용자가 항목을 클릭할 때 해당 파일에 대한 처리를 위한 콜백 함수가 호출됩니다.
 *
 * @returns {JSX.Element} - 파일 목록을 렌더링하는 JSX 요소를 반환합니다.
 */

export default function FileList() {
  const files = useFilesStore((state) => state.files);
  const fetchFiles = useFilesStore((state) => state.fecthFiles);

  const selectedFiles = useSelectedFilesStore((state) => state.selectedFiles);
  const folderPath = useSelectedFilesStore((state) => state.folderPath);
  const moveFolderPath = useSelectedFilesStore((state) => state.moveFolderPath);

  const owner = sessionStorage.getItem("owner");
  const repo = useParams<{ id: string }>();

  const isActiveMoveDir = folderPath !== "";
  const prevDirPath = folderPath.substring(0, folderPath.lastIndexOf("/"));
  const moveDirName = folderPath.split("/")[folderPath.split("/").length - 1];

  /**
   * 특정 파일이 선택된 상태인지 확인하는 함수입니다.
   *
   * @param {TGithubContent} file - 선택 여부를 확인할 파일 객체
   * @returns {boolean} - 파일이 선택된 경우 `true`, 그렇지 않은 경우 `false`를 반환합니다.
   */
  const isFileSelected = (file: TGithubContent) => {
    const isSelected = selectedFiles.some(
      (selectedFile) => selectedFile.sha === file.sha,
    );
    return isSelected;
  };

  /**
   * 이전 폴더로 이동하는 함수입니다.
   * 이전 폴더의 경로로 파일을 가져오고 상태를 업데이트합니다.
   */
  const handleClickPrevFolder = () => {
    if (owner) {
      fetchFiles(owner, repo.id, prevDirPath);
      moveFolderPath(prevDirPath);
    }
  };

  /**
   * 컴포넌트가 마운트될 때 초기 폴더의 파일들을 가져오는 효과를 설정합니다.
   */
  useEffect(() => {
    if (owner) {
      fetchFiles(owner, repo.id, "");
      moveFolderPath("");
    }
  }, []);

  return (
    <>
      <ul className="h-[924px] overflow-y-auto">
        {isActiveMoveDir && (
          <div
            className="flex h-[44px] cursor-pointer items-center gap-2 border border-[#E6E6E6] p-2"
            onClick={handleClickPrevFolder}
          >
            <Image
              src={leftArrowImg}
              alt="Prev Folder"
              width={24}
              height={24}
            />
            <span className="text-base text-[#3F3F3F]">{moveDirName}</span>
          </div>
        )}
        {files.map((file) => {
          const isSelected = isFileSelected(file);
          return (
            <FileListItem key={file.sha} isSelected={isSelected} file={file} />
          );
        })}
      </ul>
    </>
  );
}
