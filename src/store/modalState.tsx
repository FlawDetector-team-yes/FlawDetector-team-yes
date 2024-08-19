import { create } from "zustand";
import { FC } from "react";

type ModalState = {
  isOpen?: boolean;
  ModalContent?: FC<any>;
  props?: { [key: string]: any };
  setProps: (prop: object) => void;
  setIsOpen?: () => void;
  setIsClose?: () => void;
  setModalContent?: (value: FC<any>) => void;
};

function InitialContent() {
  return <div>오류입니다. 모달 콘텐츠를 입력해주세요</div>;
}
/**
 * 모달 상태를 관리하는 커스텀 훅.
 * @param {boolean} isOpen - 모달이 열려 있는지 여부.
 * @param {React.FC<any>} ModalContent - (모달을 열 시 필수!)모달 내부 FunctionComponent 또는 JSX
 * @param {Object} props - 외부에서 모달에 전해 줄 내용.
 * @param {Function} setProps - 모달에 대한 추가 속성을 설정하는 함수.
 * @param {Function} setIsOpen - 모달을 여는 함수.
 * @param {Function} setIsClose - 모달을 닫고 내용을 초기화하는 함수.
 * @param {Function} setModalContent - 모달의 내용을 설정하는 함수.
 */

const useModal = create<ModalState>((set) => ({
  isOpen: false,
  ModalContent: InitialContent,
  props: {},
  setProps: (prop) => set(() => ({ props: prop })),
  setIsOpen: () => set(() => ({ isOpen: true })),
  setIsClose: () =>
    set(() => ({ isOpen: false, ModalContent: InitialContent, props: {} })),
  setModalContent: (value: FC<any>) => set(() => ({ ModalContent: value })),
}));

export default useModal;
