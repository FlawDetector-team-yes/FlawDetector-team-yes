import Image from "next/image";
import xMarkError from "../../../public/images/x-mark-error.png";
import triangleYellow from "../../../public/images/triangle-yellow.png";
import circleGreen from "../../../public/images/circle-green.png";
import menuRepoFolder from "../../../public/images/menu-repo-folder.png";
import FileListItem from "./FileListItem";
import { TRepositoryFiles, TSelectedFiles } from "@/app/me/(analyze)/type";

export type TFileListProps = {
  onClick: (file: TSelectedFiles) => void;
  fileData: TRepositoryFiles[];
  selectedFiles : TSelectedFiles[]
};

export default function FileList({ onClick, fileData, selectedFiles }: TFileListProps) {
  return (
    <>
      <aside className="flex h-[1163px] w-[247px] flex-col justify-between">
        <div className="flex h-[65px] w-[246px] justify-evenly gap-6 rounded-lg border-[1px] border-[#C3C3C3] p-5">
          <div className="flex w-[44px] items-center justify-center gap-2 text-xl">
            <Image src={xMarkError} alt="Error" width={18} height={18} />
            {12}
          </div>
          <p className="flex w-[44px] items-center justify-center gap-2 text-xl">
            <Image src={triangleYellow} alt="Error" width={23} height={20} />
            {8}
          </p>
          <p className="flex w-[44px] items-center justify-center gap-2 text-xl">
            <Image src={circleGreen} alt="Error" width={22} height={22} />
            {23}
          </p>
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
          <ul className="h-[924px] overflow-y-auto">
            {fileData.map((file) => {
              // 'let'을 사용하여 변수를 선언하고 값을 설정합니다
              const isSelected = selectedFiles.some(
                (selectedFile) => selectedFile.id === file.id,
              );
            console.log(isSelected);
              // JSX를 반환합니다
              return (
                <FileListItem
                  key={file.id} // 각 항목에 고유한 key를 추가합니다
                  isSelected={isSelected} // 변수 이름을 'isSelected'로 수정
                  file={file}
                  onClick={onClick}
                />
              );
            })}
          </ul>
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
