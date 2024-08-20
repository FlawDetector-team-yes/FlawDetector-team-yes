import GitListItem from "@/components/me/GitListItem";
import ProfileInfo from "@/components/me/ProfileInfo";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

function MyPage() {
  return (
    <>
      <div className={inter.className}>
        <div className="mx-auto flex w-[1314px] flex-col">
          <div className="mb-[80px] flex w-full flex-col items-center text-4xl text-[#6100FF]">
            {/* /me */}
            <h1 className="mb-3 font-extralight">Containing code files</h1>
            <div className="rounded-full border-4 border-solid border-[#6100FF] px-7 py-3 font-normal">
              MY Library
            </div>
          </div>
          <ProfileInfo />
          <GitListItem />
        </div>
      </div>
      ;
    </>
  );
}
export default MyPage;
