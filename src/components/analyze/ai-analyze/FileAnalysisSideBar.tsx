"use client";

import Image from "next/image";
import fileImg from "../../../../public/images/file.png";
import xMarkError from "../../../../public/images/x-mark-error.png";
import triangleYellow from "../../../../public/images/triangle-yellow.png";
import circleGreen from "../../../../public/images/circle-green.png";
import menuRepoFolder from "../../../../public/images/menu-repo-folder.png";
import {
  TResultData,
  useAnalyzeFileResultStore,
  useResSelectedStore,
} from "@/store/useAnalyzeStore";
import StateItem from "../StateItem";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

/**
 * `FileAnalysisSideBar` 컴포넌트는 사이드바에 분석 파일 목록을 표시합니다.
 * 각 파일은 아이콘과 함께 파일 이름이 나열됩니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {TAnalysisResult[]} props.analysisResults - 분석 결과 배열
 * @returns {JSX.Element} - 사이드바 파일 목록 구성 요소
 */
export default function FileAnalysisSideBar() {
  const { id } = useParams();
  const analyzeFileResult = useAnalyzeFileResultStore(
    (state) => state.analyzeFileResult,
  );
  const setResSelected = useResSelectedStore((state) => state.setResSelected);
  const resSelected = useResSelectedStore((state) => state.resSelected);
  const [onClick, setOnClick] = useState<{
    sha: string;
    name: string;
    state: boolean;
  }>({
    sha: "",
    name: "",
    state: true,
  });

  const onClickFile = (f: TResultData) => {
    setOnClick((prev) => ({
      ...prev,
      sha: f.sha,
      name: f.name,
      state: !prev.state,
    }));
    setResSelected(f);
  };

  return (
    <>
      <aside className="flex max-h-fit w-[247px] flex-col justify-between gap-5">
        <div className="flex h-fit w-[246px] flex-col justify-evenly gap-6 rounded-lg border-[1px] border-[#C3C3C3] p-5">
          <StateItem src={xMarkError} alt="검출된 취약점" count={12} />
          <StateItem src={triangleYellow} alt="수정 제안" count={8} />
          <StateItem src={circleGreen} alt="문제 없음" count={23} />
        </div>
        <div className="h-[994px] w-[247px] scroll-smooth rounded-xl border-[1px] border-[#C3C3C3]">
          <div className="flex h-[70px] justify-between rounded-t-xl bg-primary-50 p-5">
            <div className="flex items-center gap-[10px] text-xl">
              <img
                className="rounded-full"
                src="https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
                alt="Profile Image"
                width={30}
                height={30}
              />
              <p>{sessionStorage.getItem("owner")}</p>
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
          <ul className="rounded-sm">
            {/* 분석 결과  */}
            {analyzeFileResult?.data?.map((f) => (
              <li
                key={f.sha}
                onClick={() => onClickFile(f)}
                className={`flex h-[44px] cursor-pointer items-center gap-2 border border-[#E6E6E6] p-2 ${
                  onClick.sha === f.sha &&
                  onClick.name === f.name &&
                  onClick.state
                    ? "bg-[#E3E1E7]"
                    : "hover:bg-[#E3E1E7]"
                }`}
              >
                <button className="flex gap-1">
                  <Image src={fileImg} alt="File" width={24} height={24} />
                  <span>{f.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Link href={`/me/repos/${id}`}>
          <button className="fill-radius-8px h-[56px] w-[246px] text-xl">
            추가 검사 하기
          </button>
        </Link>
      </aside>
    </>
  );
}
