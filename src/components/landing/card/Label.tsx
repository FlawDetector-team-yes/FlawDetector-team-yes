import { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  color: string;
  bgColor: string;
}

/**
 * CardArticle - CardList - Card - Label
 * `Label` 컴포넌트는 특정 색상으로 테두리와 배경을 설정할 수 있는 레이블을 렌더링합니다.
 * 이 컴포넌트는 주어진 색상 값에 따라 스타일을 동적으로 적용하며, 내용을 `children` 속성으로 받습니다.
 *
 * @param {LabelProps} props - 레이블에 필요한 색상과 내용을 포함한 프로퍼티 객체입니다.
 * @returns {JSX.Element} 설정된 색상과 내용을 가진 레이블을 렌더링하는 JSX 요소를 반환합니다.
 */
function Label({ children, color, bgColor }: LabelProps) {
  return (
    <div
      className="inline-flex h-[46px] items-center justify-center gap-2.5 rounded-full border px-3 py-2"
      style={{ borderColor: color, backgroundColor: bgColor }}
    >
      <span className="text-center text-xl font-medium" style={{ color }}>
        {children}
      </span>
    </div>
  );
}

export default Label;
