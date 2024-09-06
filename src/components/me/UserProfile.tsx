"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import userInfoStore from "@/store/useAuth";

function UserProfile() {
  const userData = userInfoStore((state) => state.userInfo);
  const setUserData = userInfoStore((state) => state.setUserData);
  const { data: session } = useSession();
  // const docRef = collection(db, "users");
  const [userProfileImg, setUserProfileImg] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        console.log(session);
        setUserData({
          email: session.user?.email,
          username: session.user?.name,
          profileImg: session.user?.image,
        });
        setUserProfileImg(userData?.profileImg as string);
      }
    };
    fetchData();
  }, [session, userProfileImg]);

  return (
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
  );
}
export default UserProfile;
