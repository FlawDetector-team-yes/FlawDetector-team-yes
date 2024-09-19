import ProfileInfo from "@/components/me/ProfileInfo";
import { SessionProvider } from "next-auth/react";
import { getSession } from "@/lib/getSession";
import GitRepoList from "@/components/me/GitRepoList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Library",
  description:
    "인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게 해결하세요.",
};

async function MyPage() {
  const session = await getSession();
  return (
    <>
      <div>
        <div className="mx-auto flex w-[1314px] flex-col">
          <div className="mb-[80px] flex w-full flex-col items-center text-4xl text-[#6100FF]">
            {/* /me */}
            <h1 className="mb-3 font-extralight">Containing code files</h1>
            <div className="rounded-full border-4 border-solid border-[#6100FF] px-7 py-3 font-normal">
              MY Library
            </div>
          </div>
          <SessionProvider session={session}>
            <ProfileInfo />
          </SessionProvider>
          <GitRepoList />
        </div>
      </div>
      ;
    </>
  );
}
export default MyPage;
