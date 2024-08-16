"use client";
import Image from "next/image";
import CaretDoubleDownIcon from "/public/images/CaretDoubleDown.svg";

function CaretDoubleDown() {
  const handleClick = () => {
    // 여기에 클릭 시 실행할 코드를 추가
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
