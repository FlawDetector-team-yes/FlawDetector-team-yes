import { useEffect, useState } from "react";
import bgBug from "../../../public/images/bg-bug-icon.svg";
import Image from "next/image";
export default function Loading() {
  const [dots, setDots] = useState(""); // 점을 관리할 상태

  useEffect(() => {
    const interval = setInterval(() => {
      // 점의 개수를 3개까지 증가시키고, 그 이후에는 다시 빈 문자열로 초기화
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500); // 500ms 간격으로 업데이트

    // 컴포넌트가 언마운트될 때 setInterval을 정리
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-7 flex gap-2 pl-6">
      <div>
        <h1 className="text-[20px] font-semibold">플렉디텍터 운영자</h1>
        <div className="flex items-end gap-2">
          <div className="h-[40px] max-w-[300px] rounded-b-2xl rounded-tr-2xl bg-[#F7F7F7] px-[8px] py-[12px] text-[#535557]">
            <p>{dots}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
