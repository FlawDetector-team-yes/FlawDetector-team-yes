"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalContainer from "./ModalContainer";
import useModal from "@/store/modalState";

const ModalProvider = () => {
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
        createPortal(<ModalContainer />, document.body)}
    </>
  );
};

export default ModalProvider;
