"use client";

import ProgressList from "./ProgressList";
import CodeArea from "./CodeArea";
import FileSideBar from "./FileSideBar";
import useSelectedFilesStore from "@/store/useSelectedFilesStore";
import useFilesStore, { fetchRepoContents } from "@/store/useFilesStore";
import { decodeUnicode } from "@/lib/decodeUnicode";
import OpenModalBtn from "./OpenModalBtn";
import { useStepStore } from "@/store/useAnalyzeStore";

/**
 * `AnalysisWrapper` 컴포넌트
 *
 * 이 컴포넌트는 파일 분석 작업을 관리하고 UI를 렌더링합니다.
 * 파일 선택, 전체 선택, 선택된 파일에 대한 코드 표시 및 분석 대기 상태를 처리합니다.
 *
 * @returns {JSX.Element} `AnalysisWrapper` 컴포넌트가 렌더링됩니다.
 */
export default function AnalysisWrapper() {
  const selectAllFile = useSelectedFilesStore((state) => state.selectedAllFile);
  const folderPath = useSelectedFilesStore((state) => state.folderPath);
  const files = useFilesStore((state) => state.files);
  const currentStep = useStepStore((state) => state.currentStep); // 현재 단계 상태

  /**
   * 전체 파일을 선택하고 파일 내용을 가져와 상태를 업데이트합니다.
   *
   * @async
   * @function handleSelectedAllFile
   * @returns {Promise<void>} 파일 선택 및 상태 업데이트가 완료됩니다.
   */
  const handleSelectedAllFile = async () => {
    // files 배열에서 type이 "file"인 파일만 필터링
    const fileItems = files.filter((file) => file.type === "file");

    // file이 존재한다면,
    if (fileItems) {
      const fileContentsPromises = fileItems.map((file) =>
        fetchRepoContents(
          "flawdetector-team-yes",
          "flawdetector-team-yes",
          `${folderPath}/${file.name}`,
        ),
      );
      try {
        // file 정보를 불러오는 api를 Promise.all로 병렬적으로 요청
        const fileContentsArray = await Promise.all(fileContentsPromises);

        // 파일 내용을 base64로 디코딩하고 selectedFiles 상태 업데이트
        const selectedFiles = fileContentsArray.map((file) => {
          const decodedContent = decodeUnicode(file.content);
          console.log(decodedContent);
          return {
            sha: file.sha,
            name: file.name,
            content: decodedContent,
          };
        });
        selectAllFile(selectedFiles);
      } catch (error) {
        console.error("Error fetching or decoding files:", error);
      }
    }
  };
  return (
    <>
      <section className="flex h-[107px] w-full min-w-[1760px] gap-7">
        <button
          className="flex w-[247px] items-center justify-center gap-[10px] rounded-lg bg-primary-500 px-4 text-2xl font-semibold text-white"
          onClick={() => handleSelectedAllFile()}
        >
          파일 전체 선택
        </button>
        <ProgressList />
      </section>
      <main className="relative flex h-[1163px] min-w-[1760px] gap-7">
        <FileSideBar />
        <section className="flex w-[1484px] gap-[28px]">
          <CodeArea type="select" />
          <CodeArea type="analyze" />
        </section>
        {currentStep === "analyze" && <OpenModalBtn />}
      </main>
      {/* 
      검사 확인, 검사 상태 모달 들어갈 예정
      <Modal />
     */}
    </>
  );
}
