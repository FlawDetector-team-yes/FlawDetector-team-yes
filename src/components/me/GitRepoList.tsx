"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import plus from "/public/images/plus.png";
import useUserStore from "@/store/useUserStore";
import GitRepoListItem from "./GitRepoListItem";
import GitRepoListLoading from "./GitRepoListLoading";
import RepoSortDropdown from "./RepoSortDropdown";

export type TMyPageUserReposType = {
  label: string;
  name: string;
  createdAt: string;
};

export type TSortType = "recent" | "oldest" | "name"; // pending, analyze, finish 추가 예정

export default function GitRepoList() {
  const user = useUserStore((state) => state.userInfo);
  const [repos, setRepos] = useState<TMyPageUserReposType[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const isMoreItems = repos.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  /**
   * 레포지토리 정렬 함수
   * @param {TSortType} sortType - 정렬 기준 ("recent", "oldest", "name")
   */
  const handleSortRepos = (sortType: TSortType) => {
    const sortFunctions: Record<TSortType, (a: any, b: any) => number> = {
      recent: (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      oldest: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      name: (a: any, b: any) => a.name.localeCompare(b.name),
    };
    const sortedRepos = [...repos].sort(sortFunctions[sortType]);

    setRepos(sortedRepos);
  };

  /**
   * 사용자 GitHub 레포지토리 목록을 불러오는 함수
   * 사용자 정보가 있을 경우에만 API 호출
   */
  const fetchUserRepos = async () => {
    try {
      if (user) {
        const res = await await (
          await fetch(`api/github/repos/${user.owner}`)
        ).json();
        setRepos(res);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * 컴포넌트가 마운트될 때 및 사용자 정보가 변경될 때
   * 레포지토리 목록을 불러옴
   */
  useEffect(() => {
    fetchUserRepos();
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
      <div className="grid grid-cols-4 gap-10 pt-5">
        {/* 레포 목록 */}
        {!repos.length ? (
          <GitRepoListLoading />
        ) : (
          repos
            .slice(0, visibleCount)
            .map((repo, index) => (
              <GitRepoListItem key={index} repo={repo} repoState={"pending"} />
            ))
        )}
      </div>

      {/* 더보기 버튼 */}
      {isMoreItems && (
        <div className="mt-12 flex w-full justify-center">
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
