"use client";

import chat from "../../../public/images/chat.png";
import Image from "next/image";
import chatActive from "../../../public/images/chat-active.png";
import { useEffect, useState } from "react";
import bgBug from "../../../public/images/bg-bug-icon.svg";
import TextInput from "./TextInput";
import chatBotStore from "@/store/chatBotStore";
import AiResponse from "./AiResponse";

import UserRequest from "./UserRequest";
import FolderResult from "./FolderResult";

import { DetailContentProps } from "@/types/vulnerability";
import Loading from "./Loading";

type TReposState = {
  repoId: string;
  repoName: string;
  state: string;
};

type CombinedMessage =
  | { type: "user" | "ai" | "loading"; text: string; loading?: boolean }
  | { type: "result"; data: TReposState };

export default function ChatBot({ detailData, dataId }: DetailContentProps) {
  detailData = detailData || null;
  const { userTextList, aiTextList, resultFolderList, loading } =
    chatBotStore();

  const [chatBotActive, setChatBotActive] = useState(false);

  // 상태가 변경될 때마다 combinedTextList 생성

  const maxLength = Math.max(
    userTextList.length,
    aiTextList.length,
    resultFolderList.length,
  );

  const combinedList: CombinedMessage[] = [];

  for (let i = 0; i < maxLength; i++) {
    if (i < userTextList.length) {
      combinedList.push({ type: "user", text: userTextList[i].text });
      combinedList.push({ type: "loading", text: "", loading: loading });
    }
    if (i < aiTextList.length && userTextList[i].text !== "검사결과") {
      combinedList.pop();
      combinedList.push({
        type: "ai",
        text: aiTextList[i].text,
      });
    } else if (userTextList[i].text === "검사결과") {
      if (resultFolderList.length === 0) {
        combinedList.pop();
        combinedList.push({
          type: "ai",
          text: "검사결과가 없습니다.",
        });
      } else {
        for (let j = 0; j < resultFolderList.length; j++) {
          combinedList.pop();
          combinedList.push({
            type: "result",
            data: resultFolderList[j],
          });
        }
      }
    }
  }

  const today = new Date();
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes(); // 분

  return (
    <>
      <div className="fixed bottom-12 right-12 z-50 flex flex-col items-end">
        {/* talk */}

        <div
          className={
            chatBotActive === true
              ? `mb-5 flex h-[726px] w-[558px] flex-col justify-between rounded-3xl bg-[#FFFFFF] shadow-xl`
              : `hidden`
          }
        >
          <div>
            <div className="flex items-center gap-3 rounded-t-3xl bg-[#6100FF] p-5 text-[24px] text-[#FFFFFF]">
              <div>
                <Image src={chat} alt="채팅아이콘" />
              </div>
              <h1 className="font-semibold">플로디텍터 운영자</h1>
            </div>
            <div className="max-h-[558px] overflow-y-auto">
              <div className="mb-7 flex gap-2 pl-6">
                <div>
                  <Image
                    src={bgBug}
                    width={50}
                    height={50}
                    alt="배경버그아이콘"
                  />
                </div>
                <div>
                  <h1 className="text-[20px] font-semibold">
                    플렉디텍터운영자
                  </h1>
                  <div className="flex items-end gap-2">
                    <div className="max-w-[200px] rounded-b-2xl rounded-tr-2xl bg-[#F7F7F7] px-[8px] py-[12px] text-[#535557]">
                      <p>
                        <strong>CNNVD</strong>에 대해 모르는게 생기셨나요 ?
                        <br />
                        <strong>CNNVD에 대해 궁금한 점을 물어봐주세요 !</strong>
                      </p>
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

              {combinedList?.map((item, index) => {
                if (item.type === "user") {
                  return <UserRequest key={index} text={item.text as string} />;
                }
                if (item.type === "loading") {
                  return <Loading key={index} />;
                }
                if (item.type === "ai") {
                  return <AiResponse key={index} text={item.text as string} />;
                }
                if (item.type === "result") {
                  return (
                    <FolderResult
                      key={index}
                      data={item?.data as TReposState}
                    />
                  );
                }
              })}
            </div>
          </div>
          <TextInput detailData={detailData} dataId={""} />
        </div>

        <div
          onClick={() => setChatBotActive(!chatBotActive)}
          className="flex h-[76px] w-[76px] cursor-pointer items-center justify-center rounded-full border border-solid border-[#6100FF] bg-[#FFFFFF]"
        >
          <Image src={chatActive} alt="챗봇 활성화 아이콘" />
        </div>
      </div>
    </>
  );
}
