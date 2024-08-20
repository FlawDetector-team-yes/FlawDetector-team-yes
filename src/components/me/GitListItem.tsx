"use client";
import { useEffect, useState } from "react";
import menuDot from "/public/images/menu-dot.png";
import Image from "next/image";
import plus from "/public/images/plus.png";
import LibrarySort from "./LibrarySort";
// /me github repository 아이템요소 컴포넌트
export default function GitListItem() {
  // 17개의 요소를 가진 배열 생성
  let array = new Array(17);

  // 배열의 길이를 기준으로 표시할 항목의 총 높이 계산
  let arrLength = Math.ceil((array.length * 200) / 3);

  // 상태 초기화: 컴포넌트 높이, overflow 스타일, 계산된 높이, '더보기' 버튼 표시 여부
  const [styleHeight, setStyleHeight] = useState<number | string>(710);
  const [styleOverflow, setStyleOverflow] = useState("hidden");
  const [count, setCount] = useState<number | string>(arrLength);
  const [showMore, setShowMore] = useState(false);

  //삭제,공유 각 인덱스에 맞춰 활성화 해야하기때문에 초기값은 null
  const [miniModal, setMiniModal] = useState<number | null>(null);
  // 컴포넌트가 마운트될 때 배열의 길이를 확인하고 '더보기' 버튼 표시 여부를 결정
  useEffect(() => {
    if (12 < array.length) {
      setShowMore(!showMore);
    }
  }, []);
  useEffect(() => {
    if (styleHeight < count) {
      setStyleOverflow("hidden");
      // 그렇지 않으면 overflow를 보이게 하고 높이를 auto로 설정, "더보기" 버튼을 숨김
    } else {
      setStyleOverflow("visible");
    }
  }, [moreHandler]);

  // '더보기' 버튼을 클릭했을 때 호출되는 함수
  function moreHandler() {
    // 현재 높이가 count보다 작으면 높이를 증가시키고 overflow를 숨김 상태로 유지
    if (styleHeight < count) {
      setStyleHeight((prev) => (typeof prev === "number" ? prev + 710 : prev));
    }
    // 그렇지 않으면 overflow를 보이게 하고 높이를 'auto'로 설정
    else {
      setStyleHeight("auto");
    }
  }
  function miniModalHandler(index: number) {
    // 클릭한 인덱스가 현재 열려 있는 모달의 인덱스와 같으면 닫고, 다르면 열리게 설정
    setMiniModal((prev) => (prev === index ? null : index));
  }
  return (
    <>
      <LibrarySort />
      <div
        style={{
          height: styleHeight < count ? `${styleHeight}px` : "auto",
          overflow: styleOverflow,
        }}
        className={`grid grid-cols-4`}
      >
        {array
          .fill({
            label: "label",
            imgSrc: menuDot,
            title: "Folder name",
            sub: "sub title",
          })
          .map((item, index) => (
            <div
              key={index}
              className="mt-[30px] flex h-[200px] w-[310px] flex-col justify-between rounded-xl border border-solid border-[#E0CEFF] px-2 py-4"
            >
              <div className="relative flex h-[30px] justify-between">
                <div className="h-[23px] w-[43px] rounded-full border border-solid border-[#3F3F3F] px-1 py-[2px] text-center text-[12px]">
                  label
                </div>
                <div
                  className="w-[10px] cursor-pointer"
                  onClick={() => miniModalHandler(index)}
                >
                  <Image src={item.imgSrc} alt="삼단바" width={3} height={17} />
                </div>
                {miniModal === index && (
                  <div className="absolute right-[-1px] top-5 flex h-[94px] w-[70px] flex-col justify-center gap-4 rounded-lg bg-[#ffffff] text-[16px] font-medium shadow-md">
                    <span className="w-full text-center">삭제</span>
                    <span className="w-full text-center">공유</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[24px]">{item.title}</span>
                <span className="font-light">{item.sub}</span>
              </div>
            </div>
          ))}
      </div>
      {styleOverflow === "hidden" && (
        <div className="mt-10 flex w-full justify-center">
          <button
            className="flex h-[54px] w-[103px] items-center justify-center rounded-lg border border-solid border-[#6100FF] text-[#6100FF]"
            onClick={moreHandler}
          >
            <span>more </span>
            <div>
              <Image src={plus} alt="더보기" width={18} height={18} />
            </div>
          </button>
        </div>
      )}
    </>
  );
}
