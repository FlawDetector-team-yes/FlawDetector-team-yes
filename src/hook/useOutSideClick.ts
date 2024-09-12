"use client";

import useModalStore from "@/store/useModalStore";
import { useEffect, RefObject } from "react";
/**
 * @param ref 모달의 내부 컴포넌트 부분을 등록하면 외부 클릭시 모달 닫히도록 설정 가능
 */
const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
) => {
  const { setIsClose } = useModalStore();
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsClose?.();
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, [ref]);
};

export default useOutsideClick;
