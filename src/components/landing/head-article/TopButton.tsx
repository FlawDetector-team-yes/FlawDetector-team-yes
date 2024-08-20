"use client";
import Image from "next/image";
import upArrow from "/public/images/up-active.svg";

/**
 * `TopButton` 컴포넌트는 랜딩 페이지의 상단으로 스크롤하는 버튼을 렌더링합니다.
 * 이 버튼은 화면의 오른쪽 하단에 고정되어 있으며, 클릭 시 페이지 상단으로 부드럽게 스크롤됩니다.
 *
 * @returns {JSX.Element} 페이지 상단으로 스크롤하는 버튼을 렌더링하는 JSX 요소를 반환합니다.
 */
function TopButton() {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={onClick}
      className="fixed bottom-10 right-10 z-[999] flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-full border border-primary-500 bg-white/50 p-4 backdrop-blur-lg"
    >
      <Image src={upArrow} alt="Up Arrow Icon" width={32} height={32} />
      <span className="font-inter text-center text-base font-medium text-primary-500">
        TOP
      </span>
    </button>
  );
}

export default TopButton;
