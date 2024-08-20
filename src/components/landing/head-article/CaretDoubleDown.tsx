"use client";
import Image from "next/image";
import CaretDoubleDownIcon from "/public/images/CaretDoubleDown.svg";

function CaretDoubleDown() {
  const handleClick = () => {
    window.scrollTo({ top: 1390, behavior: "smooth" });
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
