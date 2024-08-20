import ProfileInfo from "@/components/me/ProfileInfo";
import leftArrow from "/public/images/left-violet-arrow.png";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import ToggleSwitch from "@/components/me/ToggleSwitch";
const inter = Inter({ subsets: ["latin"] });
export default function SettingPage() {
  return (
    <>
      <div className={inter.className}>
        <div className="mx-auto flex w-[1314px] flex-col">
          <div className="mb-[80px] flex w-full flex-col items-center text-4xl text-[#6100FF]">
            <Link href="/me">
              <button className="border-3 out-radius-999px relative w-[140px] border-[#6100FF] py-1 text-right text-2xl font-normal">
                <Image
                  className="absolute bottom-[10px] left-2"
                  src={leftArrow}
                  alt="이전화살표"
                  width={24}
                  height={24}
                />
                Setting
              </button>
            </Link>
          </div>
          <ProfileInfo />
          <div className="flex w-full justify-between border-b-2 pb-[40px]">
            <div className="flex h-[103px] flex-col justify-between py-[50px]">
              <div className="flex gap-5">
                <span className="text-[18px] font-bold">계정 유형</span>
                <span className="text-[18px]">깃허브 연동</span>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between pb-[40px]">
            <div className="flex h-[103px] w-[100%] flex-col justify-between gap-6 py-[40px]">
              <div>
                <h1 className="text-[18px] font-bold">알림</h1>
              </div>
              <div className="flex w-[100%] justify-between">
                <span className="text-[16px] font-normal">
                  이메일로 알림 받기
                </span>
                <ToggleSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
