"use client";

import { useState } from "react";
// /me/setting의 알림의 토글 스위치 컴포넌트
export default function ToggleSwitch() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setToggle(!toggle);
          console.log(toggle);
        }}
        className={
          toggle === false
            ? `flex h-[32px] w-[56px] items-center rounded-[272px] bg-[#C2C2C2]`
            : `flex h-[32px] w-[56px] items-center justify-end rounded-[272px] bg-[#6100FF]`
        }
      >
        <div className="h-[28px] w-[28px] rounded-full bg-[#ffffff]"></div>
      </div>
    </>
  );
}
