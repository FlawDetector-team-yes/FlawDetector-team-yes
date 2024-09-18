"use client";
import Image from "next/image";
import CaretDoubleDownIcon from "/public/images/caretdoubledown-white.svg";
/**
 * `CaretDoubleDown` 컴포넌트는 페이지를 아래로 스크롤하는 버튼을 렌더링합니다.
 *
 * @returns {JSX.Element} 스크롤을 유도하는 버튼을 렌더링하는 JSX 요소를 반환합니다.
 */
function CaretDoubleDownWhite() {
  const handleScrollDown = () => {
    const scrollAmount = 1280;

    window.scrollBy({
      top: scrollAmount,
      left: 0,
      behavior: "smooth", // 부드러운 스크롤
    });
  };

  return (
    <button
      onClick={handleScrollDown}
      className="animate-bounce focus:outline-none"
      aria-label="Scroll Down"
    >
      <Image
        src={CaretDoubleDownIcon}
        alt="Scroll Down"
        width={56}
        height={56}
      />
    </button>
  );
}

export default CaretDoubleDownWhite;
