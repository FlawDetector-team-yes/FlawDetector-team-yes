import Image from "next/image";
import bugImg from "../../../public/images/bug-white.svg";
import { AnalysisModal } from "./analyze-modal/AnalysisModal";
import {
  useAnalyzeFilesStore,
  useResultDataStore,
} from "@/store/useAnalyzeStore";
import useModalStore from "@/store/useModalStore";

function OpenModalBtn() {
  // 모달을 열기 위한 함수와 모달 콘텐츠를 설정하는 함수
  const openModal = useModalStore((state) => state.setIsOpen);
  const modalContent = useModalStore((state) => state.setModalContent);
  const analyzeFiles = useAnalyzeFilesStore((state) => state.analyzeFiles);
  const resultData = useResultDataStore((state) => state.resultData);

  /**
   * 분석 버튼 클릭 시 호출되는 함수입니다.
   * 모달을 열고 분석 모달을 콘텐츠로 설정합니다.
   */
  const handleAnalysisBtn = () => {
    if (openModal && modalContent) {
      openModal();
      modalContent(AnalysisModal);
    }
  };

  return (
    <>
      <div className="fixed bottom-[100px] right-[130px]">
        <button
          className="flex rounded-full bg-primary-500 p-5"
          onClick={handleAnalysisBtn}
        >
          <Image
            src={bugImg}
            alt="bug"
            width={50}
            height={50}
            className={
              resultData.length === analyzeFiles.length
                ? ""
                : "animate-[spin_3s_linear_infinite]"
            }
          />
        </button>
      </div>
    </>
  );
}
export default OpenModalBtn;
