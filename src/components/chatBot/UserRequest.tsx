"use-client";
type UserRequestProps = {
  text: string;
};
export default function UserRequest({ text }: UserRequestProps) {
  const today = new Date();
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분

  return (
    <>
      <div className="mt-9 flex items-end justify-end gap-2 pr-6">
        <div className="text-sm font-normal text-[#8B8F93]">
          <span>
            {hours < 12
              ? minutes < 10
                ? `오전 ${hours}:${"0" + minutes}`
                : `오전 ${hours}:${minutes}`
              : minutes < 10
                ? `오후 ${hours}:${"0" + minutes}`
                : `오후 ${hours}:${minutes}`}
          </span>
        </div>
        <div className="max-w-[300px] rounded-l-2xl rounded-br-2xl bg-[#6100FF] px-[8px] py-[12px] text-[#ffffff]">
          <p>{text}</p>
        </div>
      </div>
      ;
    </>
  );
}
/* Frame 1437261179 */
