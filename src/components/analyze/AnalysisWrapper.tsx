"use client";
import { useState } from "react";
import { fileData } from "@/app/me/(analyze)/data";
import { TSelectedFiles } from "@/app/me/(analyze)/type";
import ProgressList from "./ProgressList";
import FileList from "./FileList";
import CodeArea from "./CodeArea";

export default function AnalysisWrapper() {
  const [selectedFiles, setSelectedFiles] = useState<TSelectedFiles[]>([]);

  // 파일 선택
  const handleToggleFiles = (file: TSelectedFiles) => {
    setSelectedFiles((prev) => {
      const fileIndex = prev.findIndex((f) => f.id === file.id);

      if (fileIndex === -1) {
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
        return prev.filter((f) => f.id !== file.id);
      }
    });
  };
  // 폴더 전체 선택
  const handleSelectAllFiles = () => {
    let allFiles = fileData.map((file) => {
      return { ...file, isCodeAnalyzed: "pending" };
    });
    setSelectedFiles(allFiles);
  };

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
        <FileList
          selectedFiles={selectedFiles}
          onClick={handleToggleFiles}
          fileData={fileData}
        />
        <section className="flex gap-[28px]">
          <CodeArea type="select" selectedFiles={selectedFiles} />
          <CodeArea type="analyze" selectedFiles={selectedFiles} />
        </section>
      </main>
    </>
  );
}
