"use client";

import { useState } from "react";
import triangleDown from "/public/images/triangle-Down.png";
import Image from "next/image";
import { TSortType } from "./GitRepoList";

// 한국어 옵션을 TSortType 값으로 맵핑하는 객체
const OPTION_MAP: Record<string, TSortType> = {
  //검사전: "pending",
  //검사중: "analyze",
  //검사완료: "finish",
  최신순: "recent",
  "오래된 순": "oldest",
  이름순: "name",
};

const TYPE_OPTION: Record<"type" | "sort", string[]> = {
  type: ["검사전", "검사중", "검사완료"],
  sort: ["최신순", "오래된 순", "이름순"],
};

type TRepoSortDropdownProps = {
  typeName: "type" | "sort"; // typeName의 타입을 고정
  sort: (sortType: TSortType) => void;
};

export default function RepoSortDropdown({
  typeName,
  sort,
}: TRepoSortDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const capitalizeTypeName = typeName[0].toUpperCase() + typeName.slice(1);

  // 드롭다운 항목 클릭 핸들러
  const handleOptionClick = (option: string) => {
    const mappedValue = OPTION_MAP[option]; // 한국어 옵션을 영문 값으로 변환
    sort(mappedValue); // 선택된 정렬 옵션을 부모에게 전달
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex w-[77px] items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <span className="text-base">{capitalizeTypeName}</span>
        <Image src={triangleDown} alt="DropDown" width={14} height={14} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {TYPE_OPTION[typeName].map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
