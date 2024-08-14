import Image from "next/image";
import fileImg from "../../../public/images/file.png";
import closeImg from "../../../public/images/x-mark-off.png";

type TProgressBarProps = React.ComponentPropsWithoutRef<"button">;
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
