"use client";

import Link from "next/link";
import useUserStore from "@/store/useUserStore";

// /me/my-profile 마이페이지 프로필정보 클릭 시 나의 정보와 라이브러이 설정들을 보여주는 컴포넌트.
export default function ProfileInfoList() {
  const userData = useUserStore((state) => state.userInfo);
  return (
    <>
      <div className="flex w-full justify-between border-b-[1px] pb-[40px]">
        <div className="flex h-[203px] flex-col justify-between py-[40px]">
          <div>
            <h1 className="text-2xl font-bold">내정보</h1>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[18px]">계정</span>
            <input type="text" readOnly placeholder={userData?.email || ""} />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between border-b-[1px] pb-[40px]">
        <div className="flex h-[203px] flex-col justify-between py-[40px]">
          <div className="flex flex-col gap-7 text-[18px]">
            <Link href="/me/clip">
              <span className="text-[18px] font-medium">스크랩</span>
            </Link>
            <Link href="/me/setting">
              <span>설정</span>
            </Link>
            <span>고객센터</span>
          </div>
        </div>
      </div>
      <div className="flex h-[203px] flex-col gap-4 py-[40px]"></div>
    </>
  );
}
