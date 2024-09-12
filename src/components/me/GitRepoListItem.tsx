"use client";

import Image from "next/image";
import bugImg from "../../../public/images/bug-white.svg";
import rightArrowImg from "../../../public/images/right-arrow-white.svg";
import starPurple from "../../../public/images/star-purple.svg";
import starWhite from "../../../public/images/star-white.svg";
import { TMyPageUserReposType } from "./GitRepoList";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { useReposStateStore } from "@/store/useAnalyzeStore";

/**
 * 레포 상태별 배경색 설정 객체
 * @type {Record<TRepoState, string>}
 */
const BG_COLOR: Record<TRepoState, string> = {
  pending: "bg-[#F1F1F1]",
  analyze: "bg-[#fde3e3]",
  finish: "bg-[#e9ddff]",
};

/**
 * 레포 상태별 텍스트 색상 설정 객체
 * @type {Record<TRepoState, string>}
 */
const TEXT_COLOR: Record<TRepoState, string> = {
  pending: "text-[#969696]",
  analyze: "text-[#FF6D6D]",
  finish: "text-[#6100FF]",
};

/**
 * 레포 상태별 라벨 텍스트 설정 객체
 * @type {Record<TRepoState, string>}
 */
const TEXT = {
  pending: "검사전",
  analyze: "검사중",
  finish: "검사완료",
};

/**
 * 레포 상태 타입 정의
 * @typedef {"pending" | "analyze" | "finish"} TRepoState
 */
export type TRepoState = "pending" | "analyze" | "finish";

/**
 * Git 레포지토리 목록 아이템 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {TMyPageUserReposType} props.repo - 레포지토리 정보
 * @param {string} props.repoState - 레포지토리 상태
 */
export default function GitRepoListItem({
  repo,
  repoState,
  isAnalyze,
}: {
  repo: TMyPageUserReposType;
  repoState: TRepoState;
  isAnalyze: boolean;
}) {
  const bookmarkedRepos = useUserStore((state) => state.bookmarkedRepos);
  const reposState = useReposStateStore((state) => state.reposState);
  const toggleBookmarkedRepos = useUserStore(
    (state) => state.toggleBookmarkedRepos,
  );
  const router = useRouter();

  /**
   * 페이지 이동 처리 함수
   * 레포 상태에 따라 검사 페이지 또는 검사 결과 페이지로 이동
   */
  const handlePageChange = () => {
    // 검사 페이지 이동
    const repoId = reposState.find(
      (repoState) => repoState.repoName === repo.name,
    );

    if (repoState !== "finish") {
      router.push(`/me/repos/${repo.name}`);
    } else {
      // repoId가 undefined일 경우 빈 문자열로 처리
      const safeRepoId = repoId?.repoId ?? "";
      router.push(`/me/repos/${repo.name}/${safeRepoId}`);
    }
  };
  return (
    <div
      className={`group flex h-[225px] w-[310px] flex-col justify-between rounded-3xl border border-solid border-[#E0CEFF] p-[20px] hover:bg-[#FAF8FF]`}
    >
      <div className="flex h-[30px] flex-col justify-between">
        <div className="flex justify-between">
          {/* 라벨 */}
          <div
            className={`${BG_COLOR[repoState]} ${repoState !== "finish" ? "w-[63px]" : "w-[78px]"} flex h-[35px] items-center justify-center gap-3 rounded-full px-2 py-3`}
          >
            <span
              className={`${TEXT_COLOR[repoState]} font-pretendard text-base font-bold`}
            >
              {TEXT[repoState]}
            </span>
          </div>
          {/* 북마크*/}
          <button
            className="flex h-[48px] w-[48px] items-center justify-center gap-3 rounded-xl group-hover:border-[1px] group-hover:border-[#E0CEFF]"
            onClick={() => toggleBookmarkedRepos(repo.name)}
          >
            {bookmarkedRepos.includes(repo.name) ? (
              <Image
                src={starPurple}
                alt="Star Purple"
                width={32}
                height={32}
              />
            ) : (
              <Image
                className="opacity-0 group-hover:opacity-100"
                src={starWhite}
                alt="Star Purple"
                width={32}
                height={32}
              />
            )}
          </button>
        </div>
        {/* 레포명 */}
        <span className="w-[280px] break-words text-[24px]">{repo.name}</span>
      </div>
      <div className="flex items-end justify-between">
        {/* 검사하기 버튼 */}
        <button
          disabled={isAnalyze && repoState == "pending"}
          onClick={handlePageChange}
          className={`${isAnalyze && repoState === "pending" ? "brightness-[0.6]" : ""} ${repoState.includes("finish") ? "bg-black" : "bg-primary-500"} flex h-[45px] w-[146px] items-center justify-evenly rounded-xl`}
        >
          <div className="flex gap-[6px]">
            <Image src={bugImg} alt="Bug" width={18} height={18} />
            <span className="font-pretendard text-[18px] text-white">
              {repoState === "finish" ? "결과보기" : "검사하기"}
            </span>
          </div>
          <Image src={rightArrowImg} alt="Bug" width={9} height={9} />
        </button>
        <span className="text-[16px] font-light text-[#969696]">
          {repo.createdAt.slice(0, 10)}
        </span>
      </div>
    </div>
  );
}
