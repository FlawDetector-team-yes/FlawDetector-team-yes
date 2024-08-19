"use client";

import Image from "next/image";
import githubImg from "/public/images/github.svg";

function GithubLogin() {
  const onClick = () => {};
  return (
    <button
      onClick={onClick}
      className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[999px] bg-[#6100ff] px-6 py-4 text-center font-['Inter'] text-[28px] font-light text-white"
    >
      <Image src={githubImg} alt="githubImg" width={40} height={40} />
      Github로 연동 로그인하기
    </button>
  );
}
export default GithubLogin;
