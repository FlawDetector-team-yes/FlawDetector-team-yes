"use client";
import Image from "next/image";

function CaretDoubleDown() {
  const onClick = () => {};

  return (
    <button onClick={onClick} className="animate-bounce">
      <Image
        src="/images/CaretDoubleDown.svg"
        alt="CaretDoubleDown"
        width={56}
        height={56}
      />
    </button>
  );
}
export default CaretDoubleDown;
