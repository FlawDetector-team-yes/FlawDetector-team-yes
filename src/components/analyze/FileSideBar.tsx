import Image from "next/image";
import xMarkError from "../../../public/images/x-mark-error.png";
import triangleYellow from "../../../public/images/triangle-yellow.png";
import circleGreen from "../../../public/images/circle-green.png";
import menuRepoFolder from "../../../public/images/menu-repo-folder.png";
import { TFile, TSelectedFiles } from "@/app/me/(analyze)/type";
import StateItem from "./StateItem";
import FileList from "./FileList";

export type TFileListProps = {
  onClick: (file: TSelectedFiles) => void;
  fileData: TFile[];
  selectedFiles: TSelectedFiles[];
};

/**
 * `FileSideBar` 컴포넌트는 사이드바를 렌더링하며, 통계와 프로필, 파일 목록을 포함합니다.
 * 통계는 상태 항목을 표시하고, 프로필 영역과 파일 목록이 하위 요소로 포함됩니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {Function} props.onClick - 파일 클릭 시 호출되는 콜백 함수
 * @param {TFile[]} props.fileData - 파일 데이터 배열
 * @param {TSelectedFiles[]} props.selectedFiles - 선택된 파일 목록
 * @returns {JSX.Element} - 사이드바 구성 요소
 */
export default function FileSideBar({
  onClick,
  fileData,
  selectedFiles,
}: TFileListProps) {
  return (
    <>
      <aside className="flex h-[1163px] w-[247px] flex-col justify-between">
        {/* 통계 */}
        <div className="flex h-[65px] w-[246px] justify-evenly gap-6 rounded-lg border-[1px] border-[#C3C3C3] p-5">
          <StateItem src={xMarkError} alt="Error" count={12} />
          <StateItem src={triangleYellow} alt="Warning" count={8} />
          <StateItem src={circleGreen} alt="Success" count={23} />
        </div>

        {/* 프로필 */}
        <div className="h-[994px] w-[247px] scroll-smooth rounded-xl border-[1px] border-[#C3C3C3]">
          <div className="flex h-[70px] justify-between rounded-t-xl bg-primary-50 p-5">
            <div className="flex items-center gap-[10px] text-xl">
              <img
                className="rounded-full"
                src="https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
                alt="Profile Image"
                width={30}
                height={30}
              />
              <p>testProfile</p>
            </div>
            <div className="flex items-center">
              <Image
                src={menuRepoFolder}
                width={14}
                height={6.5}
                alt="Menu Repo Folder"
              />
            </div>
          </div>
          {/* 파일 목록 */}
          <FileList
            fileData={fileData}
            onClick={onClick}
            selectedFiles={selectedFiles}
          />
        </div>
        <button
          className="fill-radius-8px-lg w-[246px] text-xl"
          onClick={() => alert("검사하기")}
        >
          검사하기
        </button>
      </aside>
    </>
  );
}
