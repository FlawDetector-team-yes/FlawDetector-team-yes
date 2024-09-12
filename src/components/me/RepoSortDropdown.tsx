"use client";

import { useState } from "react";
import triangleDown from "/public/images/triangle-Down.png";
import Image from "next/image";
import { TSortType } from "./GitRepoList";

/**
 * 한국어 옵션을 TSortType 값으로 맵핑하는 객체
 * @type {Record<string, TSortType>}
 */
const OPTION_MAP: Record<string, TSortType> = {
  //검사전: "pending",
  //검사중: "analyze",
  //검사완료: "finish",
  최신순: "recent",
  "오래된 순": "oldest",
  이름순: "name",
};

/**
 * 타입별 드롭다운 옵션
 * @type {Record<"type" | "sort", string[]>}
 */
const TYPE_OPTION: Record<"type" | "sort", string[]> = {
  type: ["검사전", "검사중", "검사완료"],
  sort: ["최신순", "오래된 순", "이름순"],
};

type TRepoSortDropdownProps = {
  typeName: "type" | "sort"; // typeName의 타입을 고정
  sort: (sortType: TSortType) => void;
};

/**
 * RepoSortDropdown 컴포넌트
 * Git 레포지토리 리스트에서 타입 또는 정렬 기준을 선택할 수 있는 드롭다운 메뉴
 * @param {TRepoSortDropdownProps} props - 컴포넌트 속성
 * @param {"type" | "sort"} props.typeName - 드롭다운 메뉴의 타입 (type 또는 sort)
 * @param {(sortType: TSortType) => void} props.sort - 정렬 기준을 부모 컴포넌트로 전달하는 함수
 * @returns {JSX.Element} RepoSortDropdown 컴포넌트
 */
export default function RepoSortDropdown({
  typeName,
  sort,
}: TRepoSortDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const capitalizeTypeName = typeName[0].toUpperCase() + typeName.slice(1);
  /**
   * 드롭다운 항목 클릭 시 호출되는 함수
   * 한국어 옵션을 영문 옵션으로 변환하여 부모 컴포넌트로 전달 후 드롭다운을 닫음
   * @param {string} option - 선택된 드롭다운 옵션
   */
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
