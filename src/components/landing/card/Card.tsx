import { ReactNode } from "react";
import Label from "./Label";

type Card = {
  children: ReactNode;
  color: string;
  bgColor: string;
  labelText: string;
  image?: string;
};

function Card({ children, color, bgColor, labelText, image }: Card) {
  return (
    <div className="item-middle flex h-[461.26px] w-[339.32px] flex-col gap-8 rounded-[40px] bg-white shadow-2xl shadow-black">
      <Label color={color} bgColor={bgColor}>
        {labelText}
      </Label>
      <div className="text-center text-[120px]">{image}</div>
      <div className="inline-flex h-[52px] flex-col items-center justify-start gap-1 text-base">
        <div className="text-center font-['Inter'] text-base font-normal leading-normal text-[#5f5f5f]">
          {children}
        </div>
      </div>
    </div>
  );
}
export default Card;
