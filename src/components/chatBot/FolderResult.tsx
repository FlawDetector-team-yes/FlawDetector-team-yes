import chatBotStore from "@/store/chatBotStore";
import bugImg from "../../../public/images/bug-white.svg";
import rightArrowImg from "../../../public/images/right-arrow-white.svg";
import bgBug from "../../../public/images/bg-bug-icon.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";
type TReposState = {
  repoId: string;
  repoName: string;
  state: string;
};
type TFolder = {
  key: number;
  data: TReposState;
};
export default function FolderResult({ data }: TFolder) {
  console.log(data);
  const today = new Date();
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분
  const router = useRouter();
  const handlePageChange = () => {
    router.push(`/me/repos/${data.repoName}/${data.repoId}`);
  };
  return (
    <>
      <div className="mb-7 flex gap-2 pl-6">
        <div>
          <Image src={bgBug} width={50} height={50} alt="배경버그아이콘" />
        </div>
        <div>
          <h1 className="text-[20px] font-semibold">플렉디텍터운영자</h1>

          <div className="flex items-end gap-2">
            {/* {data?.map((item) => ( */}
            <div className="flex max-h-[180px] w-[200px] flex-col gap-9 rounded-[20px] border border-solid border-[#E0CEFF] bg-[#FFFFFF] px-[15px] py-[15px]">
              <div className="flex-col">
                <div className="w-[60px] rounded-[20px] bg-[#e9ddff] px-2 py-1 text-xs font-bold text-[#6100FF]">
                  <span>검사완료</span>
                </div>
                <div className="mt-1 text-[16px]">
                  <span>{data?.repoName}</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                {/* 검사하기 버튼 */}
                <button
                  onClick={handlePageChange}
                  className="flex h-[35px] w-[106px] items-center justify-evenly rounded-xl bg-black"
                >
                  <div className="flex gap-[6px]">
                    <Image src={bugImg} alt="Bug" width={18} height={18} />
                    <span className="font-pretendard text-[14px] text-white">
                      결과보기
                    </span>
                  </div>
                  <Image src={rightArrowImg} alt="Bug" width={9} height={9} />
                </button>
              </div>
            </div>
            {/* ))} */}

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
