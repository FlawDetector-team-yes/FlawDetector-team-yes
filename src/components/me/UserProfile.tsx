"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useUserStore from "@/store/useUserStore";
import basicUserImage from "../../../public/images/basic-user.png";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

function UserProfile({ isSession }: { isSession: Session | null }) {
  const userData = useUserStore((state) => state.userInfo);
  const userProfileImg = useUserStore((state) => state.userInfo?.profileImg);
  const isLoading = useUserStore((state) => state.isLoading);
  const setUserData = useUserStore((state) => state.setUserData);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const { data: session } = useSession();
  const router = useRouter(); // redirect logic in client component

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
        sessionStorage.setItem("owner", owner);

        setUserData({
          email: session.user?.email,
          username: session.user?.name,
          profileImg: session.user?.image,
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
      {userProfileImg ? (
        <Image
          className={`rounded-full transition-opacity duration-500`}
          src={session?.user?.image ? session?.user?.image : basicUserImage}
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
  );
}
export default UserProfile;
