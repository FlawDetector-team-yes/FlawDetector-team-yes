import ProfileInfo from "@/components/me/ProfileInfo";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import leftArrow from "/public/images/left-violet-arrow.png";
import DetectedListItem from "@/components/me/DetectedListItem";
const inter = Inter({ subsets: ["latin"] });
export default function DetectedPage() {
  return (
    <>
      <div className={inter.className}>
        <div className="mx-auto flex w-[1314px] flex-col">
          <div className="mb-[80px] flex w-full flex-col items-center text-4xl text-[#6100FF]">
            <Link href="/me/my-profile">
              <button className="border-3 out-radius-999px relative w-[220px] border-[#6100FF] py-1 text-right text-2xl font-normal">
                <Image
                  className="absolute bottom-[10px] left-2"
                  src={leftArrow}
                  alt="이전화살표"
                  width={24}
                  height={24}
                />
                Detected Files
              </button>
            </Link>
          </div>

          <DetectedListItem />
        </div>
      </div>
    </>
  );
}
