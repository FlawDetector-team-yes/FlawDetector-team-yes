"use client";
import Image from "next/image";
import ProfileInfoList from "./ProfileInfoList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useUserStore from "@/store/useUserStore";

// /me 마이페이지 상단의 나의정보와 프로필정보 로그아웃을 나타내는 컴포넌트
export default function ProfileInfo() {
  const userData = useUserStore((state) => state.userInfo);
  const setUserData = useUserStore((state) => state.setUserData);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const { data: session } = useSession();
  // const docRef = collection(db, "users");

  const pathName = usePathname();
  const [userProfileImg, setUserProfileImg] = useState("");

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
        setUserProfileImg(userData?.profileImg as string);
        setIsLoading();
      }
    };
    fetchData();
  }, [session, userProfileImg]);

  return (
    <>
      <div className="flex w-full justify-between border-b-2 pb-[60px]">
        <div className="flex gap-6 rounded-full">
          <Image
            className="rounded-full"
            src={userProfileImg}
            alt="프로필이미지"
            width={70}
            height={40}
          />
          <div className="flex flex-col text-2xl">
            <span>Hello,</span>
            <span>{userData?.email}</span>
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
