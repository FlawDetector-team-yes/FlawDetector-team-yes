"use client";

import Image from "next/image";
import xMarkError from "../../../public/images/x-mark-error.png";
import triangleYellow from "../../../public/images/triangle-yellow.png";
import circleGreen from "../../../public/images/circle-green.png";
import menuRepoFolder from "../../../public/images/menu-repo-folder.png";
import StateItem from "./StateItem";
import FileList from "./FileList";
import { AnalysisModal } from "./analyze-modal/AnalysisModal";
import { useEffect, useState } from "react";
import useModalStore from "@/store/useModalStore";

/**
 * `FileSideBar` 컴포넌트는 사이드바를 렌더링하며, 통계와 프로필, 파일 목록을 포함합니다.
 * 통계는 상태 항목을 표시하고, 프로필 영역과 파일 목록이 하위 요소로 포함됩니다.
 *
 * @component
 * @param {Object} props - 컴포넌트의 속성입니다.
 * @param {Function} props.onClick - 파일 클릭 시 호출되는 콜백 함수입니다.
 * @param {TSelectedFiles[]} props.selectedFiles - 선택된 파일 목록입니다.
 * @returns {JSX.Element} 사이드바 컴포넌트입니다.
 */
export default function FileSideBar() {
  // 모달을 열기 위한 함수와 모달 콘텐츠를 설정하는 함수
  const openModal = useModalStore((state) => state.setIsOpen);
  const modalContent = useModalStore((state) => state.setModalContent);
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  /**
   * 분석 버튼 클릭 시 호출되는 함수입니다.
   * 모달을 열고 분석 모달을 콘텐츠로 설정합니다.
   */
  const handleAnalysisBtn = () => {
    if (openModal && modalContent) {
      openModal();
      modalContent(AnalysisModal);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserProfile(sessionStorage.getItem("userProfile"));
      setOwner(sessionStorage.getItem("owner"));
    }
  }, []);

  return (
    <>
      <aside className="flex max-h-fit w-[247px] flex-col justify-between gap-5">
        {/* 통계 */}
        <div className="flex h-fit w-[246px] flex-col justify-evenly gap-6 rounded-lg border-[1px] border-[#C3C3C3] p-5">
          <StateItem src={xMarkError} alt="검출된 취약점" count={"-"} />
          <StateItem src={triangleYellow} alt="수정 제안" count={"-"} />
          <StateItem src={circleGreen} alt="문제 없음" count={"-"} />
        </div>

        <div className="h-[994px] w-[247px] scroll-smooth rounded-xl border-[1px] border-[#C3C3C3]">
          {/* 프로필 */}
          <div className="flex h-[70px] justify-between rounded-t-xl bg-primary-50 p-5">
            <div className="flex items-center gap-[10px] text-xl">
              {userProfile ? (
                <Image
                  className="rounded-full"
                  src={userProfile}
                  alt="Profile Image"
                  width={30}
                  height={30}
                />
              ) : (
                <div className="h-[30px] w-[30px] animate-pulse rounded-full bg-gray-400"></div>
              )}

              <p>{owner}</p>
            </div>
            <div className="flex items-center">
              <Image
                src={menuRepoFolder}
                width={14}
                height={6.5}
                alt="Menu Repo Folder"
              />
            </div>
          </div>
          {/* 파일 목록 */}
          <FileList />
        </div>
        {/* 검사 하기 */}
        <button
          className="fill-radius-8px h-[56px] w-[246px] text-xl"
          onClick={handleAnalysisBtn}
        >
          검사하기
        </button>
      </aside>
    </>
  );
}
