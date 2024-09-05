"use client";
import { useEffect, useState } from "react";
import menuDot from "/public/images/menu-dot.png";
import Image, { StaticImageData } from "next/image";
import plus from "/public/images/plus.png";
import LibrarySort from "./LibrarySort";
import useUserStore from "@/store/useUserStore";

type TUserInfoType = {
  label: string;
  name: string;
  createdAt: string;
};

export default function GitListItem() {
  const user = useUserStore((state) => state.userInfo);
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
        {repos.slice(0, visibleCount).map((repo, index) => (
          <div
            key={index}
            className="flex h-[200px] w-[310px] flex-col justify-between rounded-xl border border-solid border-[#E0CEFF] px-2 py-4"
          >
            <div className="flex h-[30px] flex-col justify-between gap-2">
              <div className="h-[23px] w-[43px] rounded-full border border-solid border-[#3F3F3F] px-1 py-[2px] text-center text-[12px]">
                label
              </div>
              <span className="w-[296px] break-words text-[24px]">
                {repo.name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-light">{repo.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 더보기 버튼 */}
      {isMoreItems && (
        <div className="mt-7 flex w-full justify-center">
          <button
            className="flex h-[54px] w-[103px] items-center justify-center rounded-lg border border-solid border-[#6100FF] text-[#6100FF]"
            onClick={handleLoadMore}
          >
            <span>more </span>
            <div>
              <Image src={plus} alt="더보기" width={18} height={18} />
            </div>
          </button>
        </div>
      )}
    </>
  );
}
