import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import triangleDown from "../../../public/images/triangle-down.png";
import triangleUp from "../../../public/images/triangle-up.svg"; // 드롭다운이 열렸을 때 보여줄 이미지

const SortDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 URL에서 정렬 파라미터 가져오기
  const currentSort = searchParams.get("sort") || "recent";

  // 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(currentSort);

  // 정렬 옵션들
  const sortOptions = [
    { label: "최신순", value: "recent" },
    { label: "오래된 순", value: "oldest" },
    { label: "태그:취약성 보고서", value: "report" },
    { label: "태그:취약성 알림", value: "notice" },
    { label: "태그:기타", value: "etc" },
  ];

  // 드롭다운 열기/닫기
  const toggleDropdown = () => setIsOpen(!isOpen);

  // 정렬 옵션 클릭 시 URL 업데이트
  const handleOptionClick = (optionValue: string) => {
    setSelectedSort(optionValue);
    setIsOpen(false);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", optionValue);
    router.push(`?${newParams.toString()}`);
  };

  useEffect(() => {
    // URL 파라미터가 바뀔 때 드롭다운 값도 동기화
    setSelectedSort(currentSort);
  }, [currentSort]);

  return (
    <div className="flex gap-4">
      <div className="relative inline-block text-left">
        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="flex w-[120px] items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" // 버튼의 가로 길이를 150px로 늘림
        >
          <span className="w-full text-center text-base">
            {/* 선택된 옵션 표시 */}
            {sortOptions.find((option) => option.value === selectedSort)?.label}
          </span>
          <Image
            src={isOpen ? triangleUp : triangleDown} // 드롭다운 열렸을 때 이미지를 변경
            alt="DropDown"
            width={14}
            height={14}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
