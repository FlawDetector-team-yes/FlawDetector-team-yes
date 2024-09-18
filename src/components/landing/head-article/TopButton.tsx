"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import upArrow from "/public/images/up-active.svg";

/**
 * `TopButton` 컴포넌트는 랜딩 페이지의 상단으로 스크롤하는 버튼을 렌더링합니다.
 * 이 버튼은 화면의 오른쪽 하단에 고정되어 있으며, 클릭 시 페이지 상단으로 부드럽게 스크롤됩니다.
 * 페이지의 최상단에서는 버튼이 보이지 않고, 스크롤을 내리면 버튼이 나타납니다.
 *
 * @returns {JSX.Element} 페이지 상단으로 스크롤하는 버튼을 렌더링하는 JSX 요소를 반환합니다.
 */
function TopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true); // 스크롤이 200px 이상 내려가면 버튼 보이기
    } else {
      setIsVisible(false); // 스크롤이 200px 이하일 때 버튼 숨기기
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={onClick}
        className="fixed bottom-10 right-10 z-[999] flex h-16 w-16 transform items-center justify-center rounded-full border border-gray-300 bg-white shadow-lg transition-transform hover:scale-110 hover:bg-primary-100"
      >
        <Image src={upArrow} alt="Up Arrow Icon" width={28} height={28} />
      </button>
    )
  );
}

export default TopButton;
