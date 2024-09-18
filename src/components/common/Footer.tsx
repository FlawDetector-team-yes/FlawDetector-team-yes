"use client";
import Image from "next/image";
import sfacspace from "/public/images/sfacspace.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainBackground from "../../../public/images/bg-circle.svg";

function Footer() {
  const currentPath = usePathname();

  //텍스트 스타일
  const textBaseClass =
    "text-center font-['Inter'] text-base font-medium leading-normal";
  const textGrayClass = `${textBaseClass} text-[#969696]`;
  const textDarkClass = `${textBaseClass} text-[#3f3f3f]`;

  if (currentPath === "/login") {
    return null;
  }

  return (
    <footer className="bg-[rgba(250, 248, 255, 0.5)] relative bottom-0 left-0 right-0 flex justify-between px-20 py-10">
      {/* 배경 이미지 */}
      <Image
        src={MainBackground}
        alt="Main Background"
        fill
        className="z-[-1] object-cover"
      />

      <div className="flex">
        <Image
          src={sfacspace}
          alt="sfacspaceImg"
          width={120}
          height={55}
          className="mr-6"
        />

        <div className="flex h-20 items-start gap-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-[26px]">
              <p className={textGrayClass}>(주)스팩스페이스</p>
              <div className="flex items-start gap-[11px]">
                <p className={textGrayClass}>대표자</p>
                <p className={textDarkClass}>염민호</p>
              </div>
            </div>
            <p className={textDarkClass}>
              서울 강서구 마곡중앙2로 11, 3층 303호
            </p>
            <div className="flex items-start gap-[23px]">
              <p className={textGrayClass}>Email</p>
              <p className={textDarkClass}>admin@sfacspace.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-start gap-[7px]">
              <p className={textGrayClass}>사업자등록번호</p>
              <p className={textDarkClass}>450-87-01864</p>
            </div>
            <div className="flex items-start gap-[13px]">
              <p className={textGrayClass}>대표전화</p>
              <p className={textDarkClass}>02-6217-1119</p>
            </div>
            <div className="flex items-start gap-[30px]">
              <p className={textGrayClass}>팩스</p>
              <p className={textDarkClass}>02-6217-1115</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end">
        <div className="flex h-[66px] flex-col items-end gap-3">
          <div className="flex items-start gap-8">
            <Link
              href="/doc/terms-of-service"
              className={`${textGrayClass} underline`}
            >
              서비스이용약관
            </Link>
            <Link
              href="/doc/privacy-policy"
              className={`${textGrayClass} underline`}
            >
              개인정보처리방침
            </Link>
          </div>
          <p className={`${textDarkClass} text-center`}>
            ⒸSpacspace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
