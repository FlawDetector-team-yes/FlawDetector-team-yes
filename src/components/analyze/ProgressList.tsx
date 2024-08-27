import InputChips from "./InputChips";
import ProgressBar from "./ProgressBar";
import useSelectedFilesStore from "@/store/useSelectedFilesStore";

/**
 * `ProgressList` 컴포넌트는 선택된 파일 목록과 파일 분석 진행 상황을 시각적으로 표시합니다.
 *
 * - 선택된 파일들을 `InputChips` 컴포넌트를 사용하여 목록으로 표시합니다.
 * - `ProgressBar` 컴포넌트를 사용하여 파일 분석 진행 상태를 표시합니다.
 *
 * @returns {JSX.Element} - 렌더링된 `ProgressList` 컴포넌트
 */
export default function ProgressList(): JSX.Element {
  const selectedFiles = useSelectedFilesStore((state) => state.selectedFiles);
  const removeFile = useSelectedFilesStore((state) => state.removeFile);

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
            <InputChips onClick={() => removeFile(file.sha)} key={file.sha}>
              {file.name}
            </InputChips>
          ))}
        </div>
        <ProgressBar progress={testProgress} />
      </div>
    </div>
  );
}
