"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalContainer from "./ModalContainer";
import useModal from "@/store/modalState";
import { useSession } from "next-auth/react";

/**
 * 모달이 열려 있는지에 따라 모달을 렌더링합니다.
 * 모달을 실제 DOM의 body 요소에 포탈(portal)로 삽입합니다.
 */
const ModalProvider = () => {
  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  const { isOpen } = useModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted &&
        isOpen &&
        typeof document !== "undefined" &&
        createPortal(<ModalContainer session={session} />, document.body)}
    </>
  );
};

export default ModalProvider;
