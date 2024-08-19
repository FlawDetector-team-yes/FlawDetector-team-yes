"use client";

import useOutsideClick from "@/hook/useOutSideClick";
import useModal from "@/store/modalState";
import { useEffect, useRef } from "react";

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
      <div ref={modalRef} className="rounded-lg bg-white p-6 shadow-lg">
        {ModalContent ? <ModalContent /> : null}
      </div>
    </div>
  );
}
export default ModalContainer;
