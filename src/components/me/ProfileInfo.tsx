import { headers } from "next/headers";
import ProfileInfoList from "./ProfileInfoList";
import UserProfile from "./UserProfile";
import UserProfileBtn from "./UserProfileBtn";
import { getSession } from "@/lib/getSession";

export default async function ProfileInfo() {
  // session state props for client component
  const isSession = await getSession();
  // get pathname in server component
  const headList = headers();
  const pathName = headList.get("x-pathname") || "";

  return (
    <>
      <div className="flex w-full justify-between border-b-2 pb-[60px]">
        <UserProfile isSession={isSession} />
        <UserProfileBtn pathName={pathName} />
      </div>
      {pathName === "/me/my-profile" ? <ProfileInfoList /> : ""}
    </>
  );
}
