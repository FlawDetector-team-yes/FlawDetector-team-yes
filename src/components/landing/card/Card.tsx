import { ReactNode } from "react";
import Label from "./Label";

type CardProps = {
  children: ReactNode;
  color: string;
  bgColor: string;
  labelText: string;
  image?: string;
};

function Card({ children, color, bgColor, labelText, image }: CardProps) {
  return (
    <div className="flex h-[461.26px] w-[339.32px] flex-col items-center justify-center gap-8 rounded-[40px] bg-white shadow-2xl shadow-black">
      <Label color={color} bgColor={bgColor}>
        {labelText}
      </Label>
      {image && <div className="text-center text-[120px]">{image}</div>}
      <div className="flex h-[52px] items-center justify-center">
        <div className="text-center font-['Inter'] text-base text-[#5f5f5f]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
