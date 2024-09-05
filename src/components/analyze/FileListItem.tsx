import fileImg from "../../../public/images/file.png";
import folderImg from "../../../public/images/folder-open.png";
import checkImg from "../../../public/images/check.png";
import successImg from "../../../public/images/circle-success.png";
import loadingImg from "../../../public/images/loading-arrow.png";
import errorImg from "../../../public/images/triangle-error.png";
import Image from "next/image";
import useFilesStore, { fetchRepoContents } from "@/store/useFilesStore";
import useSelectedFilesStore from "@/store/useSelectedFilesStore";
import { decodeUnicode } from "@/lib/decodeUnicode";
import { TGithubContent } from "@/app/me/repos/type";
import { useParams } from "next/navigation";
import { useAnalyzeFilesStore, useStepStore } from "@/store/useAnalyzeStore";

type TFileListItemProps = {
  file: TGithubContent;
  isSelected: boolean;
};

/**
 * `FileListItem` 컴포넌트는 파일 항목을 렌더링하며, 선택 상태와 클릭 핸들러를 지원합니다.
 *
 * @param {TFileListItemProps} props - 컴포넌트의 속성
 * @param {TGithubContent} props.file - 파일 정보 객체
 * @param {boolean} props.isSelected - 항목의 선택 상태
 * @returns {JSX.Element} - 파일 항목을 렌더링하는 JSX 요소
 */
function FileListItem({ file, isSelected }: TFileListItemProps) {
  const repo = useParams<{ id: string }>();
  const fetchFiles = useFilesStore((state) => state.fecthFiles);
  const selectedFiles = useSelectedFilesStore((state) => state.selectedFiles);
  const prevFolder = useSelectedFilesStore((state) => state.folderPath);
  const selectFile = useSelectedFilesStore((state) => state.selectFile);
  const removeFile = useSelectedFilesStore((state) => state.removeFile);
  const currentStep = useStepStore((state) => state.currentStep); // 현재 단계 상태
  // 검사 중인 파일들
  const analyzeFiles = useAnalyzeFilesStore((state) => state.analyzeFiles);

  /**
   * 파일 또는 폴더를 클릭했을 때 호출되는 핸들러입니다.
   * 파일일 경우: 선택된 파일을 추가하거나 제거합니다.
   * 폴더일 경우: 폴더를 선택하고 해당 폴더의 내용을 가져옵니다.
   *
   * @param {TGithubContent} file - 클릭된 파일 또는 폴더 객체
   */
  const handleClickBtn = async (file: TGithubContent) => {
    // 파일일 경우
    if (file.type === "file") {
      const fileIndex = selectedFiles.findIndex((f) => f.sha === file.sha);

      // 처음 선택한 파일일 경우
      if (fileIndex === -1) {
        try {
          const fileData = await fetchRepoContents(
            "flawdetector-team-yes",
            repo.id,
            `${prevFolder}/${file.name}`,
          );
          if (fileData && fileData.content) {
            const decodedContent = decodeUnicode(fileData.content);
            selectFile("file", fileData.name, fileData.sha, decodedContent);
          }
        } catch (error) {
          console.error("Error fetching or decoding file:", error);
        }
      } else {
        // 이미 선택한 파일일 경우
        removeFile(file.sha);
      }
      // 폴더일 경우
    } else {
      selectFile("dir", file.name);
      fetchFiles(
        "flawdetector-team-yes",
        repo.id,
        `${prevFolder}/${file.name}`,
      );
    }
  };

  const isFile = file.type === "file";
  return (
    <li
      onClick={() => handleClickBtn(file)}
      className={`flex h-[44px] cursor-pointer items-center gap-2 border border-[#E6E6E6] p-2 ${
        isSelected ? "bg-[#E3E1E7]" : "hover:bg-[#E3E1E7]"
      }`}
    >
      {isSelected && (
        <Image src={checkImg} alt="Selected" width={24} height={24} />
      )}
      <Image
        src={isFile ? fileImg : folderImg}
        alt={`${isFile ? "File" : "Folder"}`}
        width={24}
        height={24}
      />
      <div className="flex w-full justify-between">
        <span className="text-base text-[#3F3F3F]">{file.name}</span>
        {analyzeFiles.map((f) =>
          f.fileId === file.sha && f.state === "progress" ? (
            <div key={f.fileId} className="h-5 w-5">
              <Image
                src={loadingImg}
                alt="loadingImg"
                className="animate-[spin_3s_linear_infinite]"
              />
            </div>
          ) : f.fileId === file.sha && f.state === "completed" ? (
            <div key={f.fileId} className="h-5 w-5">
              <Image src={successImg} alt="successImg" />
            </div>
          ) : f.fileId === file.sha && f.state === "error" ? (
            <div key={f.fileId} className="h-5 w-5">
              <Image src={errorImg} alt="errorImg" />
            </div>
          ) : (
            ""
          ),
        )}
      </div>
    </li>
  );
}
export default FileListItem;
