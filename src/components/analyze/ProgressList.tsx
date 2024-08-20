import { TSelectedFilesProps } from "@/app/me/(analyze)/type";
import InputChips from "./InputChips";
import ProgressBar from "./ProgressBar";

/**
 * `ProgressList` 컴포넌트는 파일 목록과 진행 상황을 시각적으로 표시합니다.
 *
 * - `selectedFiles`: 현재 선택된 파일들의 배열입니다.
 * - `onClick`: 파일을 클릭할 때 호출되는 핸들러 함수입니다.
 *
 * 컴포넌트는 선택된 파일들을 표시하고, 진행 바를 통해 파일 분석 진행 상태를 나타냅니다.
 *
 * @param {TSelectedFilesProps} props - 컴포넌트에 전달되는 속성들.
 * @param {TSelectedFiles[]} props.selectedFiles - 선택된 파일의 배열.
 * @param {(file: TSelectedFiles) => void} props.onClick - 파일 클릭 시 호출되는 핸들러 함수.
 * @returns {JSX.Element} - 렌더링된 컴포넌트.
 */
export default function ProgressList({
  selectedFiles,
  onClick,
}: TSelectedFilesProps): JSX.Element {
  // 진행률 계산
  const progress =
    (selectedFiles.filter((file) => file.isCodeAnalyzed !== "Success").length /
      selectedFiles.length) *
    100;

  // 테스트용 진행도
  const testProgress = 45;

  return (
    <div>
      <div className="h-[107px] w-[1484px] gap-5 rounded-lg border-[1px] border-primary-100 p-5">
        <div
          className="mb-4 flex h-[35px] w-[1444px] gap-7 overflow-x-auto"
          style={{ overflowX: "hidden" }}
        >
          {selectedFiles.map((file) => (
            <InputChips onClick={() => onClick(file)} key={file.id}>
              {file.fileName}
            </InputChips>
          ))}
        </div>
        <ProgressBar progress={testProgress} />
      </div>
    </div>
  );
}
