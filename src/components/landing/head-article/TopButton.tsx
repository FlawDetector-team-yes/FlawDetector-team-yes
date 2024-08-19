"use client";
import Image from "next/image";
import upArrow from "/public/images/up-active.svg";

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
