"use client";
import { useState } from "react";
import triangleDown from "/public/images/triangle-Down.png";
import checkImg from "/public/images/check.png";
import Image from "next/image";
export default function Sort({ title }: { title: string }) {
  const type: Array<string> = ["폴더순", "파일순"];
  const sort: Array<string> = ["최신순", "오래된순", "이름순"];
  const [dropDown, setDropDown] = useState("");
  const [check, setCheck] = useState<number | null>(null);
  function dropDownHandler(title: string) {
    console.log(title);
    if (dropDown === "") {
      setDropDown(title);
    } else {
      setDropDown("");
    }
  }
  function checkHandler(index: number) {
    setCheck((prev) => (prev === index ? null : index));
  }
  return (
    <>
      <div className="relative z-50">
        <div
          onClick={() => dropDownHandler(title)}
          className="flex h-[44px] w-[85px] items-center gap-1 rounded-lg border border-solid border-[#969696] p-[10px]"
        >
          <span>{title}</span>
          <div>
            <Image src={triangleDown} alt="아래화살표" />
          </div>
        </div>

        <div className="flex w-full justify-end">
          {dropDown === "type" && (
            <div className="absolute top-14 flex h-[94px] w-[85px] flex-col items-center justify-center gap-4 rounded-lg bg-[#ffffff] text-[16px] font-medium shadow-md">
              {type.map((item, index) => (
                <span
                  onClick={() => checkHandler(index)}
                  className={`flex w-full cursor-pointer items-center justify-center gap-1 ${check === index ? "text-[#6100FF]" : "text-[#000000]"}`}
                  key={index}
                >
                  {check === index && (
                    <div>
                      <Image src={checkImg} alt="체크" width={14} height={14} />
                    </div>
                  )}
                  {item}
                </span>
              ))}
            </div>
          )}
          {dropDown === "sort" && (
            <div className="absolute top-14 flex h-[120px] w-[85px] flex-col items-center justify-center gap-4 rounded-lg bg-[#ffffff] text-[16px] font-medium shadow-md">
              {sort.map((item, index) => (
                <span
                  onClick={() => checkHandler(index)}
                  className={`flex h-auto w-full cursor-pointer items-center justify-center gap-1 ${check === index ? "text-[#6100FF]" : "text-[#000000]"}`}
                  key={index}
                >
                  {check === index && (
                    <div>
                      <Image src={checkImg} alt="체크" width={14} height={14} />
                    </div>
                  )}
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
