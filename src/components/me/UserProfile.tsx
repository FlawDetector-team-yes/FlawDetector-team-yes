"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useUserStore from "@/store/useUserStore";
import basicUserImage from "../../../public/images/basic-user.png";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

function UserProfile({ isSession }: { isSession: Session | null }) {
  const userData = useUserStore((state) => state.userInfo);
  const isLoading = useUserStore((state) => state.isLoading);
  const setUserData = useUserStore((state) => state.setUserData);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const { data: session } = useSession();
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
  const router = useRouter(); // redirect logic in client component

  const handleLoadImg = () => {
    setIsImgLoading(false);
  };

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

    // when you leave page, session = null
    if (isSession === null) {
      router.push("/");
    }
  }, [session, isSession]);

  return (
    <div className="flex gap-6 rounded-full">
      {/* 프로필 이미지 */}
      {isImgLoading && (
        <div className="h-[70px] w-[70px] animate-pulse rounded-full bg-gray-400"></div>
      )}

      <Image
        className={`rounded-full transition-opacity duration-500 ${
          isImgLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleLoadImg}
        src={session?.user?.image ? session?.user?.image : basicUserImage}
        alt="Profile"
        width={70}
        height={70}
      />

      <div className="flex flex-col text-2xl">
        {!isLoading && (
          <>
            <span>Hello,</span>
            <span>{userData?.email}</span>
          </>
        )}
      </div>
    </div>
  );
}
export default UserProfile;
