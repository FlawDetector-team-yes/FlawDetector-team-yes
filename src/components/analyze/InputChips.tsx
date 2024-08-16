import Image from "next/image";
import fileImg from "../../../public/images/file.png";
import closeImg from "../../../public/images/x-mark-off.png";

type TProgressBarProps = React.ComponentPropsWithoutRef<"button">;
/**
 * `InputChips` 컴포넌트는 파일 이름을 표시하고 닫기 버튼을 포함하는 사용자 인터페이스 요소를 렌더링합니다.
 * 이 컴포넌트는 버튼 역할을 하며, 전달된 속성과 자식 요소를 포함합니다.
 *
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - 컴포넌트에 전달되는 속성
 * @param {React.ReactNode} props.children - 버튼에 표시할 내용
 * @returns {JSX.Element} - 렌더링된 버튼 컴포넌트
 */
export default function InputChips({ children, ...rest }: TProgressBarProps) {
  return (
    <>
      <div>
        <button
          className="flex h-[35px] w-[221px] items-center justify-between gap-0 rounded-lg bg-[#E6DFFF] px-3 py-2 hover:bg-[#D8D2E3]"
          {...rest}
        >
          <Image src={fileImg} alt="File" width={24} height={24} />
          <span className="text-base text-[#3F3F3F]">{children}</span>
          <Image src={closeImg} alt="Close" width={11.5} height={11.5} />
        </button>
      </div>
    </>
  );
}
