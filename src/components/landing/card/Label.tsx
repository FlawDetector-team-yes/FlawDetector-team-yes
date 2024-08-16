import { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  color: string;
  bgColor: string;
}

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
