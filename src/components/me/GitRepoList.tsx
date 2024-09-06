"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import plus from "/public/images/plus.png";
import LibrarySort from "./LibrarySort";
import useUserStore from "@/store/useUserStore";
import GitRepoListItem from "./GitRepoListItem";
import GitRepoListLoading from "./GitRepoListLoading";

export type TUserInfoType = {
  label: string;
  name: string;
  createdAt: string;
};

export default function GitRepoList() {
  const user = useUserStore((state) => state.userInfo);
  const isLoading = useUserStore((state) => state.isLoading);
  const [repos, setRepos] = useState<TUserInfoType[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(12); // 초기 12개만 출력

  // repos 길이가 12개 이하일 경우, 더보기 버튼을 숨김
  const isMoreItems = repos.length > visibleCount;

  // 더보기 버튼 클릭 시, 12개씩 추가로 보여주기
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  // 사용자 github repo 목록 불러오기
  const fetchUserRepos = async () => {
    try {
      if (user) {
        const res = await await (
          await fetch(`api/github/repos/${user.owner}`)
        ).json();
        setRepos(res);
        console.log(JSON.stringify(res));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserRepos();
  }, [user]);

  return (
    <>
      <LibrarySort />
      <div className="grid grid-cols-4 gap-10 pt-5">
        {/* 레포 리스트 */}
        {!repos.length ? (
          <GitRepoListLoading />
        ) : (
          repos
            .slice(0, visibleCount)
            .map((repo, index) => (
              <GitRepoListItem key={index} repo={repo} repoType={"pending"} />
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
