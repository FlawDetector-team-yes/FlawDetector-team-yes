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
  let array = new Array(17);
  const [repos, setRepos] = useState<TUserInfoType[]>([]);
  // 배열의 길이를 기준으로 표시할 항목의 총 높이 계산
  let arrLength = Math.ceil((repos.length * 200) / 3);

  // 상태 초기화: 컴포넌트 높이, overflow 스타일, 계산된 높이, '더보기' 버튼 표시 여부
  const [styleHeight, setStyleHeight] = useState<number | string>(710);
  const [styleOverflow, setStyleOverflow] = useState("hidden");
  const [count, setCount] = useState<number | string>(arrLength);
  const [showMore, setShowMore] = useState(false);

  const fetchUserRepos = async () => {
    try {
      if (user) {
        const res = await await (
          await fetch(`api/github/repos/${user.owner}`)
        ).json();
        // {name, createdAt}
        setRepos(res);
        console.log(JSON.stringify(res));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // '더보기' 버튼을 클릭했을 때 호출되는 함수
  function moreHandler() {
    // 현재 높이가 count보다 작으면 높이를 증가시키고 overflow를 숨김 상태로 유지
    if (styleHeight < count) {
      setStyleHeight((prev) => (typeof prev === "number" ? prev + 710 : prev));
    }
    // 그렇지 않으면 overflow를 보이게 하고 높이를 'auto'로 설정
    else {
      setStyleHeight("auto");
    }
  }

  useEffect(() => {
    // 사용자 git repos
    fetchUserRepos();
    if (12 < repos.length) {
      setShowMore(!showMore);
    }
  }, [user]);

  useEffect(() => {
    if (styleHeight < count) {
      setStyleOverflow("hidden");
    } else {
      setStyleOverflow("visible");
    }
  }, [moreHandler]);

  return (
    <>
      <LibrarySort />
      <div
        style={{
          height: styleHeight < count ? `${styleHeight}px` : "auto",
          overflow: styleOverflow,
        }}
        className={`grid grid-cols-4`}
      >
        {repos.map((item, index) => (
          <div
            key={index}
            className="mt-[30px] flex h-[200px] w-[310px] flex-col justify-between rounded-xl border border-solid border-[#E0CEFF] px-2 py-4"
          >
            <div className="relative flex h-[30px] justify-between">
              <div className="h-[23px] w-[43px] rounded-full border border-solid border-[#3F3F3F] px-1 py-[2px] text-center text-[12px]">
                label
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[24px]">{item.name}</span>
              <span className="font-light">{item.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
      {styleOverflow === "hidden" && (
        <div className="mt-10 flex w-full justify-center">
          <button
            className="flex h-[54px] w-[103px] items-center justify-center rounded-lg border border-solid border-[#6100FF] text-[#6100FF]"
            onClick={moreHandler}
          >
            <span>more </span>
            <div>
              <Image src={plus} alt="더보기" width={18} height={18} />
            </div>
          </button>
          <div>{JSON.stringify(repos)}</div>
        </div>
      )}
    </>
  );
}
