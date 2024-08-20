import FileListItem from "./FileListItem";
import { TFileListProps } from "./FileSideBar";

/**
 * `FileList` 컴포넌트는 파일 목록을 렌더링합니다.
 * 각 파일 항목은 선택 상태에 따라 스타일이 적용되며,
 * 사용자가 항목을 클릭할 때 지정된 콜백 함수가 호출됩니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onClick - 파일 클릭 시 호출되는 콜백 함수
 * @param {TFile[]} props.fileData - 파일 데이터 배열
 * @param {TSelectedFiles[]} props.selectedFiles - 선택된 파일 목록
 * @returns {JSX.Element} - 파일 목록 구성 요소
 */
export default function FileList({
  onClick,
  fileData,
  selectedFiles,
}: TFileListProps) {
  return (
    <>
      <ul className="h-[924px] overflow-y-auto">
        {fileData.map((file) => {
          const isSelected = selectedFiles.some(
            (selectedFile) => selectedFile.id === file.id,
          );
          return (
            <FileListItem
              key={file.id}
              isSelected={isSelected}
              file={file}
              onClick={onClick}
            />
          );
        })}
      </ul>
    </>
  );
}
