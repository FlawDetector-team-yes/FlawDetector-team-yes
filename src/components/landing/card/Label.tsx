import { ReactNode } from "react";

function Label({
  children,
  color,
  bgColor,
}: {
  children: ReactNode;
  color: string;
  bgColor: string;
}) {
  return (
    <div
      className={
        "inline-flex h-[46px] items-center justify-center gap-2.5 rounded-[999px] border px-3 py-2"
      }
      style={{
        borderColor: color,
        backgroundColor: bgColor,
      }}
    >
      <div
        className={`text-center font-['Inter'] text-xl font-medium leading-[30px]`}
        style={{
          color: color,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Label;
