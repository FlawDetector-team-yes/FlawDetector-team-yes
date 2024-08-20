"use client";

import Image from "next/image";
import githubImg from "/public/images/github.svg";
/**
 * `GithubLogin` 컴포넌트는 GitHub 소셜 로그인을 위한 버튼을 렌더링합니다.
 * 사용자가 버튼을 클릭하면 GitHub 로그인 기능이 실행될 예정입니다.
 * 현재 `onClick` 핸들러는 빈 함수로 정의되어 있으며,
 * 실제 GitHub 로그인 기능은 추후 구현 예정입니다.
 *
 * @TODO 깃허브 로그인 기능 연결
 *
 * @returns {JSX.Element} GitHub 로그인 버튼을 렌더링하는 JSX 요소를 반환합니다.
 */
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
