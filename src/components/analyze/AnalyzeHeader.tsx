"use client";

import Image from "next/image";
import leftVioletArrow from "../../../public/images/left-violet-arrow.png";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

function AnalyzeHeader() {
  const currentPath = usePathname();
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Link
        href={currentPath === `/me/repos/${id}` ? "/me" : `/me/repos/${id}`}
      >
        <Image
          src={leftVioletArrow}
          alt="Left Violet Arrow"
          width={36}
          height={36}
        />
      </Link>
      <p className="flex items-center text-[38px] font-medium">{id}</p>
    </>
  );
}
export default AnalyzeHeader;
