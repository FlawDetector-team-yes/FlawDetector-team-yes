"use client";
import Image from "next/image";
import ProfileInfoList from "./ProfileInfoList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useUserStore from "@/store/useUserStore";

export default function ProfileInfo() {
  const userData = useUserStore((state) => state.userInfo);
  const userProfileImg = useUserStore((state) => state.userInfo?.profileImg);
  const isLoading = useUserStore((state) => state.isLoading);
  const setUserData = useUserStore((state) => state.setUserData);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const { data: session } = useSession();
  const pathName = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const profileImg = session.user?.image;
        const userNumber = profileImg
          ? profileImg.match(/u\/(\d+)/)?.[1] || null
          : null;

        const { owner } = await (
          await fetch(`/api/github/user/${userNumber}`)
        ).json();
        setUserData({
          email: session.user?.email,
          username: session.user?.name,
          profileImg: session.user?.image,
          owner: owner,
        });
        setIsLoading();
      }
    };
    fetchData();
  }, [session, userProfileImg]);

  return (
    <>
      <div className="flex w-full justify-between border-b-2 pb-[60px]">
        <div className="flex gap-6 rounded-full">
          {/* 프로필 이미지 */}
          {userProfileImg ? (
            <Image
              className={`rounded-full transition-opacity duration-500 ${
                userProfileImg ? "opacity-100" : "opacity-0"
              }`}
              src={userProfileImg}
              alt="Profile"
              width={70}
              height={70}
            />
          ) : (
            <div className="h-[70px] w-[70px] animate-pulse rounded-full bg-gray-400"></div>
          )}

          <div className="flex flex-col text-2xl">
            {!isLoading && (
              <>
                <span>Hello,</span>
                <span>{userData?.email}</span>
              </>
            )}
          </div>
        </div>

        {pathName === "/me" ? (
          <Link href="/me/my-profile">
            <button className="fill-hover out-radius-8px h-[40px] w-[126px] border-[#6100FF] font-normal">
              프로필 정보
            </button>
          </Link>
        ) : (
          <Link href="/">
            <button className="fill-hover out-radius-8px h-[40px] w-[126px] border-[#6100FF] font-normal">
              로그아웃
            </button>
          </Link>
        )}
      </div>
      {pathName === "/me/my-profile" ? <ProfileInfoList /> : ""}
    </>
  );
}
