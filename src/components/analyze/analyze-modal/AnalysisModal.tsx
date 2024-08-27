import useModal from "@/store/modalState";
import bugImg from "../../../../public/images/bug.svg";
import checkImg from "../../../../public/images/circle-purple-success.svg";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import ModalFileList from "./ModalFileList";

type TStepInfo = {
  headerText: string;
  nextBtnText: string;
  mainText?: string; // analyze와 finish 단계에서만 사용되므로 선택적(optional) 속성으로 지정
  img: StaticImageData; // 이미지 타입
};

// 3단계 UI 진행 변화 : 선택(select) > 분석(analyze) > 분석 완료(finish)
const stepInfo: Record<string, TStepInfo> = {
  select: {
    headerText: "선택한 파일을 검사하시겠습니까?",
    mainText: "",
    nextBtnText: "검사하기",
    img: bugImg,
  },
  analyze: {
    headerText: "소스 코드 취약점을 분석 중입니다.",
    mainText:
      "모든 코드 분석이 완료된 후에만 검사 이력을 저장할 수 있습니다. 잠시만 기다려 주세요.",
    nextBtnText: "저장하기",
    img: bugImg,
  },
  finish: {
    headerText: "소스코드 취약점 분석이 완료되었습니다",
    mainText:
      "AI 플로디텍터가 모든 파일의 분석을 끝냈습니다. 분석한 결과를 저장하시겠습니까?",
    nextBtnText: "저장하기",
    img: checkImg,
  },
};

/**
 * 분석 모달 컴포넌트
 * @returns {JSX.Element} 분석 모달 UI를 반환
 */
export const AnalysisModal: React.FC<any> = () => {
  const closeModal = useModal((state) => state.setIsClose); // 모달 닫기 함수
  const [currentStep, setCurrentStep] = useState<string>("select"); // 현재 단계 상태

  /**
   * 현재 단계에 따라 모달을 닫거나 분석을 중단하는 함수
   * 왼쪽 버튼 클릭 핸들러
   */
  const handleCloseModal = () => {
    if (currentStep === "analyze") {
      const userConfirmed = window.confirm(
        "검사를 정말 중단하시겠습니까? 중단하면 진행 중인 검사 데이터가 모두 사라집니다.",
      );
      if (!userConfirmed) return;
    }
    closeModal?.();
  };

  /**
   * 다음 단계로 이동하거나 분석을 완료하는 함수
   * 오른쪽 버튼 클릭 핸들러
   */
  const handleNextStep = () => {
    if (currentStep === "select") {
      setCurrentStep("analyze");
    } else if (currentStep === "analyze") {
      setCurrentStep("finish");
    } else {
      // 분석 완료 후 모달 닫기 및 저장 처리
      closeModal?.();
      // TODO: 검사 이력을 파이어베이스에 저장하고 코드 검사 결과 페이지로 이동 처리
    }
  };

  return (
    <div
      className={`${
        currentStep !== "select" ? "h-[601px]" : "h-[550px]"
      } flex h-[550px] w-[686px] flex-col items-center gap-8 rounded-2xl bg-white p-12`}
    >
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center gap-5">
        <Image
          className={`${currentStep === "analyze" && "animate-[spin_3s_linear_infinite]"}`}
          src={stepInfo[currentStep].img}
          width={50}
          height={50}
          alt="상태 아이콘"
        />
        <p className="flex flex-col items-center gap-2 text-2xl font-semibold">
          {stepInfo[currentStep].headerText}
          {stepInfo[currentStep].mainText && (
            <span className="text-[15px] font-medium text-[#747474]">
              {stepInfo[currentStep].mainText}
            </span>
          )}
        </p>
      </div>

      {/* 파일 리스트 섹션 */}
      <ModalFileList />

      {/* 버튼 섹션 */}
      <div className="flex h-[48px] gap-3 text-xl font-medium">
        <button
          className="w-[200px] rounded-lg bg-[#F1F1F1] font-semibold text-[#C3C3C3] hover:bg-[#e8e8e8]"
          onClick={handleCloseModal}
        >
          닫기
        </button>
        <button
          className={`${
            currentStep === "analyze"
              ? "bg-[#F1F1F1] text-[#C3C3C3]"
              : "border-[2px] border-[#6100FF] bg-[#6100FF] text-white hover:bg-[#5300DA]"
          } w-[200px] rounded-lg font-semibold`}
          onClick={handleNextStep}
          // disabled={currentStep === "analyze"} // TODO : 분석 중일 때 버튼 비활성화
        >
          {stepInfo[currentStep].nextBtnText}
        </button>
      </div>
    </div>
  );
};
