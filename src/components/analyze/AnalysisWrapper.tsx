"use client";

import ProgressList from "./ProgressList";
import CodeArea from "./CodeArea";
import FileSideBar from "./FileSideBar";
import useSelectedFilesStore from "@/store/useSelectedFilesStore";
import useFilesStore from "@/store/useFilesStore";
import { decodeUnicode } from "@/lib/decodeUnicode";
import { useParams } from "next/navigation";
import CodeViewer from "./CodeViewer";
import OpenModalBtn from "./OpenModalBtn";
import { useStepStore } from "@/store/useAnalyzeStore";
import { useEffect, useRef, useState } from "react";
import ToastBox from "./ToastBox";
import { fetchRepoContents } from "@/lib/api/github/fetchRepoContents";

/**
 * `AnalysisWrapper` 컴포넌트
 *
 * 이 컴포넌트는 파일 분석 작업을 관리하고 UI를 렌더링합니다.
 * 파일 선택, 전체 선택, 선택된 파일에 대한 코드 표시 및 분석 대기 상태를 처리합니다.
 *
 * @returns {JSX.Element} `AnalysisWrapper` 컴포넌트가 렌더링됩니다.
 */
export default function AnalysisWrapper() {
  const repo = useParams<{ id: string }>();
  const owner =
    typeof window !== "undefined" ? sessionStorage.getItem("owner") : null;
  const selectAllFile = useSelectedFilesStore((state) => state.selectedAllFile);
  const folderPath = useSelectedFilesStore((state) => state.folderPath);
  const files = useFilesStore((state) => state.files);
  const currentStep = useStepStore((state) => state.currentStep); // 현재 단계 상태
  const mainRef = useRef<HTMLDivElement>(null); // codeViewer의 사이즈를 알아냄
  const sidebarRef = useRef<HTMLDivElement>(null); // 첫 번째 section의 사이즈를 알아냄
  const [toastPosition, setToastPosition] = useState({ top: 0, right: 0 }); // toast의 위치를 지정해줌
  const [sidebarHeight, setSidebarHeight] = useState(0); // 측정된 첫 번째 section의 높이

  useEffect(() => {
    // 첫 번째 section의 크기를 측정하여 state에 저장하는 함수
    const updateSidebarHeight = () => {
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        setSidebarHeight(rect.height);
      }
    };

    // 페이지 로드 및 리사이즈 시 높이 업데이트
    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);

    // main의 위치를 계산하여 toast 위치를 설정합니다.
    const updateToastPosition = () => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect();
        setToastPosition({
          top: rect.top,
          right: rect.right,
        });
      }
    };

    // 페이지 로드 및 리사이즈 시 위치 업데이트
    updateToastPosition();
    window.addEventListener("resize", updateToastPosition);

    return () => {
      window.removeEventListener("resize", updateSidebarHeight);
      window.removeEventListener("resize", updateToastPosition);
    };
  }, []);

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
        fetchRepoContents(owner || "", repo.id, `${folderPath}/${file.name}`),
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
      <section className="flex h-full w-full min-w-[1760px] gap-7 rounded-md">
        <section ref={sidebarRef} className="flex w-[247px] flex-col gap-7">
          <button
            className="flex h-[107px] w-[247px] items-center justify-center gap-[10px] rounded-lg bg-primary-500 px-4 text-2xl font-semibold text-white"
            onClick={() => handleSelectedAllFile()}
          >
            파일 전체 선택
          </button>
          <FileSideBar />
        </section>

        <main
          ref={mainRef}
          style={{ height: `${sidebarHeight}px` }}
          className="relative w-full overflow-y-scroll"
        >
          <CodeViewer />
          {/* toast 알림 */}
          <ToastBox position={toastPosition} />
        </main>
        {currentStep === "analyze" && <OpenModalBtn />}
      </section>
    </>
  );
}
