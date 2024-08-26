"use client";
import Image from "next/image";
import CaretDoubleDownIcon from "/public/images/CaretDoubleDown.svg";
/**
 * `CaretDoubleDown` 컴포넌트는 페이지를 아래로 스크롤하는 버튼을 렌더링합니다.
 *
 * @returns {JSX.Element} 스크롤을 유도하는 버튼을 렌더링하는 JSX 요소를 반환합니다.
 */
function CaretDoubleDown() {
  const handleClick = () => {
    if (typeof window) {
      window.scrollTo({ top: 1280, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
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

export default CaretDoubleDown;
