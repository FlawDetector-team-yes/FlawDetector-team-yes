"use client";

import useModal from "@/store/modalState";

type CloseModalProps = {
  buttonText: string;
  className: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
/**
 * 모달 닫는 버튼로직을 연결해둔 버튼입니다.
 * @param buttonText 버튼에 들어갈 텍스트 값
 * @param className 기존 tailwind css처럼 값 넣어주시면 됩니다.(기본 디자인 아무것도 없음)
 * @param onClick 버튼 종료시 넣어줄 기능.
 */
function CloseModalButton({
  buttonText,
  className,
  onClick,
  ...rest
}: CloseModalProps) {
  const { setIsClose } = useModal();

  const handleCloseModal = () => {
    onClick && onClick();
    setIsClose && setIsClose();
  };

  return (
    <button
      className={`${className} text-center`}
      onClick={handleCloseModal}
      {...rest}
    >
      {buttonText}
    </button>
  );
}
export default CloseModalButton;
