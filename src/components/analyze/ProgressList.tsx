import { TSelectedFilesProps } from "@/app/me/(analyze)/type";
import InputChips from "./InputChips";
import ProgressBar from "./ProgressBar";

export default function ProgressList({
  selectedFiles,
  onClick,
}: TSelectedFilesProps) {
  let progess =
    (selectedFiles.filter((file) => file.isCodeAnalyzed !== "Success").length /
      selectedFiles.length) *
    100;
  let testProgress = 45;
  return (
    <>
      <div>
        <div className="h-[107px] w-[1484px] gap-5 rounded-lg border-[1px] border-primary-100 p-5">
          <div
            className="mb-4 flex h-[35px] w-[1444px] gap-7 overflow-x-auto"
            style={{ overflowX: "hidden" }}
          >
            {selectedFiles &&
              selectedFiles.map((file) => (
                <InputChips onClick={() => onClick(file)} key={file.id}>
                  {file.fileName}
                </InputChips>
              ))}
          </div>
          <ProgressBar progress={testProgress} />
        </div>
      </div>
    </>
  );
}
