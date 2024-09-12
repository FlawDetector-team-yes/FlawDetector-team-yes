import bgBug from "../../../public/images/bg-bug-icon.svg";
import Image from "next/image";
type AiResponseProps = {
  text: string;
  key: number;
};
export default function AiResponse({ text }: AiResponseProps) {
  const today = new Date();
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  return (
    <>
      <div className="mb-7 flex gap-2 pl-6">
        <div>
          <Image src={bgBug} width={50} height={50} alt="배경버그아이콘" />
        </div>
        <div>
          <h1 className="text-[20px] font-semibold">플렉디텍터운영자</h1>
          <div className="flex items-end gap-2">
            <div className="max-w-[300px] rounded-b-2xl rounded-tr-2xl bg-[#F7F7F7] px-[8px] py-[12px] text-[#535557]">
              <p>{text}</p>
            </div>
            <div className="text-sm font-normal text-[#8B8F93]">
              <span>
                {" "}
                {hours < 12
                  ? minutes < 10
                    ? `오전 ${hours}:${"0" + minutes}`
                    : `오전 ${hours}:${minutes}`
                  : minutes < 10
                    ? `오후 ${hours}:${"0" + minutes}`
                    : `오후 ${hours}:${minutes}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
