"use client";

import useOutsideClick from "@/hook/useOutSideClick";
import useModal from "@/store/modalState";
import { useEffect, useRef } from "react";

/**
 * ModalContainer 컴포넌트는 모달을 표시하고 관리하는 역할을 합니다.
 * 모달 외부 클릭을 감지하여 모달을 닫을 수 있으며,
 * 모달이 열릴 때 페이지의 스크롤을 비활성화합니다.
 */
function ModalContainer() {
  const modalRef = useRef(null);
  useOutsideClick(modalRef);
  const { ModalContent } = useModal();

  useEffect(() => {
    const $body = document.querySelector("body");

    if (!$body) {
      throw new Error("body element is not found");
    }

    //모달창 스크롤 막기
    const { overflow } = $body.style;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div ref={modalRef} className="inline-block overflow-hidden shadow-lg">
        {ModalContent ? <ModalContent /> : null}
      </div>
    </div>
  );
}
export default ModalContainer;
