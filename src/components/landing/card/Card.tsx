import { ReactNode } from "react";
import Label from "./Label";

type CardProps = {
  children: ReactNode;
  color: string;
  bgColor: string;
  labelText: string;
  image?: string;
};

/**
 * CardArticle - CardList - Card - Label
 * `Card` 컴포넌트는 주어진 색상과 텍스트를 사용하여 카드 형태의 UI 요소를 렌더링합니다.
 * 카드의 상단에는 `Label` 컴포넌트가 위치하며, 선택적으로 카드 중앙에 이미지를 표시할 수 있습니다.
 * 카드 하단에는 `children` 속성을 통해 전달된 내용을 표시합니다.
 *
 * @param {CardProps} props - 카드의 색상, 배경색, 레이블 텍스트, 선택적 이미지 및 내용을 포함한 프로퍼티 객체입니다.
 * @returns {JSX.Element} 설정된 스타일과 내용을 가진 카드 요소를 반환합니다.
 */
function Card({ children, color, bgColor, labelText, image }: CardProps) {
  return (
    <div className="flex h-[461.26px] w-[339.32px] flex-col items-center justify-center gap-8 rounded-[40px] bg-white shadow-2xl shadow-black">
      <Label color={color} bgColor={bgColor}>
        {labelText}
      </Label>
      {image && <div className="text-center text-[120px]">{image}</div>}
      <div className="flex h-[52px] items-center justify-center">
        <div className="text-center text-base text-[#5f5f5f]">{children}</div>
      </div>
    </div>
  );
}

export default Card;
