"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import plus from "../../../public/images/plus.png";
import useUserStore from "@/store/useUserStore";
import GitRepoListItem, { TRepoState } from "./GitRepoListItem";
import GitRepoListLoading from "./GitRepoListLoading";
import RepoSortDropdown from "./RepoSortDropdown";
import { fetchUserRepos } from "@/lib/api/github/fetchUserRepos";
import { useReposStateStore } from "@/store/useAnalyzeStore";

export type TMyPageUserReposType = {
  label: string;
  name: string;
  createdAt: string;
};

export type TSortType =
  | "pending"
  | "analyze"
  | "finish"
  | "recent"
  | "oldest"
  | "name";

export default function GitRepoList() {
  const user = useUserStore((state) => state.userInfo);
  const owner =
    typeof window !== "undefined" ? sessionStorage.getItem("owner") : null;
  const reposState = useReposStateStore((state) => state.reposState);
  const [repos, setRepos] = useState<TMyPageUserReposType[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const isMoreItems = repos.length > visibleCount;

  /**
   * "Load More" 버튼을 클릭할 때 호출되는 함수.
   * 화면에 표시되는 레포지토리 수를 증가시킴.
   */
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  /**
   * 상태를 비교하는 함수.
   * 특정 상태를 기준으로 레포지토리 a와 b의 상태를 비교하여 정렬 순서를 결정함.
   *
   * @param {TRepoState} aState - 레포지토리 a의 상태
   * @param {TRepoState} bState - 레포지토리 b의 상태
   * @param {TRepoState} targetState - 우선 정렬할 상태
   * @returns {number} 정렬 순서를 나타내는 값 (-1, 0, 1)
   */
  const compareRepoState = (
    aState: TRepoState,
    bState: TRepoState,
    targetState: TRepoState,
  ) => {
    if (aState === targetState && bState !== targetState) return -1;
    if (aState !== targetState && bState === targetState) return 1;
    return 0; // 상태가 동일하면 우선순위 없음
  };

  /**
   * 레포지토리 목록을 정렬하는 함수.
   * 사용자가 선택한 정렬 기준에 따라 레포지토리 목록을 정렬함.
   *
   * @param {TSortType} sortType - 사용자가 선택한 정렬 기준
   */
  const handleSortRepos = (sortType: TSortType) => {
    const sortFunctions: Record<
      TSortType,
      (a: TMyPageUserReposType, b: TMyPageUserReposType) => number
    > = {
      pending: (a, b) =>
        compareRepoState(
          checkRepoState(a.name),
          checkRepoState(b.name),
          "pending",
        ),
      analyze: (a, b) =>
        compareRepoState(
          checkRepoState(a.name),
          checkRepoState(b.name),
          "analyze",
        ),
      finish: (a, b) =>
        compareRepoState(
          checkRepoState(a.name),
          checkRepoState(b.name),
          "finish",
        ),
      recent: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      oldest: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      name: (a, b) => a.name.localeCompare(b.name),
    };

    const sortedRepos = [...repos].sort(sortFunctions[sortType]);
    setRepos(sortedRepos);
  };

  /**
   * 현재 분석 중인 레포지토리가 있는지 여부를 확인하는 함수.
   *
   * @returns {boolean} 분석 중인 레포지토리가 있으면 true, 없으면 false
   */
  const isRepoAnalyze = () => {
    return reposState.some((repoState) => repoState.state === "analyze");
  };

  /**
   * 레포지토리 이름을 기반으로 해당 레포지토리의 상태를 확인하는 함수.
   * 상태가 없으면 기본적으로 "pending" 상태를 반환함.
   *
   * @param {string} repoName - 레포지토리 이름
   * @returns {TRepoState} 레포지토리의 상태
   */
  const checkRepoState = (repoName: string): TRepoState => {
    const repo = reposState.find((repo) => repo.repoName === repoName);
    if (
      repo &&
      (repo.state === "pending" ||
        repo.state === "analyze" ||
        repo.state === "finish")
    ) {
      return repo.state as TRepoState; // 명확한 타입을 보장함
    }
    return "pending"; // 기본값
  };

  /**
   * 컴포넌트가 마운트될 때 및 사용자 정보가 변경될 때
   * 레포지토리 목록을 불러옴
   */
  useEffect(() => {
    const fetchRepos = async () => {
      if (owner) {
        const userRepos = await fetchUserRepos(owner);
        setRepos(userRepos);
      }
    };
    fetchRepos();
  }, [user]);

  return (
    <>
      <div className="mt-14 flex w-full justify-between">
        <div>
          <h1 className="text-[32px] font-medium">Library</h1>
        </div>
        {/* 레포 드롭다운 */}
        <div className="flex gap-4">
          <RepoSortDropdown typeName={"type"} sort={handleSortRepos} />
          <RepoSortDropdown typeName={"sort"} sort={handleSortRepos} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10 pb-10 pt-5">
        {/* 레포 목록 */}
        {!repos.length ? (
          <GitRepoListLoading />
        ) : (
          repos.slice(0, visibleCount).map((repo, index) => {
            const state: TRepoState = checkRepoState(repo.name); // 상태 체크 로직
            const isAnalyze = isRepoAnalyze();
            return (
              <GitRepoListItem
                key={index}
                repo={repo}
                repoState={state}
                isAnalyze={isAnalyze}
              />
            );
          })
        )}
      </div>

      {/* 더보기 버튼 */}
      {isMoreItems && (
        <div className="mb-24 mt-12 flex w-full justify-center">
          <button
            className="flex h-[54px] w-[103px] items-center justify-center gap-1 rounded-lg border border-solid border-primary-500 text-[#6100FF]"
            onClick={handleLoadMore}
          >
            <span>더보기</span>
            <div>
              <Image src={plus} alt="더보기" width={19} height={19} />
            </div>
          </button>
        </div>
      )}
    </>
  );
}
