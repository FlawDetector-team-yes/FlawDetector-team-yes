"use client";
import { useState } from "react";
import { fileData } from "@/app/me/(analyze)/data";
import { TSelectedFiles } from "@/app/me/(analyze)/type";
import ProgressList from "./ProgressList";
import CodeArea from "./CodeArea";
import FileSideBar from "./FileSideBar";

/**
 * `AnalysisWrapper` 컴포넌트
 *
 * 이 컴포넌트는 파일 분석을 관리하고 UI를 렌더링합니다.
 * 파일 선택, 전체 선택, 선택된 파일에 대한 코드 표시 및 분석 대기 중 상태를 처리합니다.
 *
 * @returns {JSX.Element} `AnalysisWrapper` 컴포넌트
 */
export default function AnalysisWrapper() {
  const [selectedFiles, setSelectedFiles] = useState<TSelectedFiles[]>([]);

  /**
   * 파일 선택 핸들러
   * @param {TSelectedFiles} file - 선택하거나 해제할 파일
   */
  const handleToggleFiles = (file: TSelectedFiles) => {
    setSelectedFiles((prev) => {
      const fileIndex = prev.findIndex((f) => f.id === file.id);

      if (fileIndex === -1) {
        // 파일을 추가
        return [
          ...prev,
          {
            id: file.id,
            fileName: file.fileName,
            code: file.code,
            isCodeAnalyzed: "pending",
          },
        ];
      } else {
        // 파일을 제거
        return prev.filter((f) => f.id !== file.id);
      }
    });
  };

  /**
   * 전체 파일 선택 핸들러
   */
  const handleSelectAllFiles = () => {
    const allFiles = fileData.map((file) => ({
      ...file,
      isCodeAnalyzed: "pending",
    }));
    setSelectedFiles(allFiles);
  };

  // 마지막 선택된 파일을 변수로 저장
  const lastSelectedFile = selectedFiles[selectedFiles.length - 1];

  return (
    <>
      <section className="flex h-[107px] w-full min-w-[1760px] gap-7">
        <button
          className="flex w-[247px] items-center justify-center gap-[10px] rounded-lg bg-primary-500 px-4 text-2xl font-semibold text-white"
          onClick={handleSelectAllFiles}
        >
          폴더 전체 검사
        </button>
        <ProgressList
          onClick={handleToggleFiles}
          selectedFiles={selectedFiles}
        />
      </section>
      <main className="flex h-[1163px] w-full min-w-[1760px] justify-between gap-7">
        <FileSideBar
          selectedFiles={selectedFiles}
          onClick={handleToggleFiles}
          fileData={fileData}
        />
        <section className="flex w-full gap-[28px]">
          <CodeArea type="select" fileCode={lastSelectedFile?.code || ""} />
          <CodeArea type="analyze" fileCode={lastSelectedFile?.code || ""} />
        </section>
      </main>
      {/* 
      검사 확인, 검사 상태 모달 들어갈 예정
     <Modal />
     */}
    </>
  );
}
