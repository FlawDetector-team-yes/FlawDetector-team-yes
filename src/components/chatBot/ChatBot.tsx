"use client";

import chat from "../../../public/images/chat.png";
import Image from "next/image";
import chatActive from "../../../public/images/chat-active.png";
import { useState } from "react";
import bgBug from "../../../public/images/bg-bug-icon.svg";
import TextInput from "./TextInput";
import chatBotStore from "@/store/chatBotStore";
import AiResponse from "./AiResponse";

import UserRequest from "./UserRequest";

export default function ChatBot() {
  const { userTextList, aiTextList } = chatBotStore();
  const [chatBotActive, setChatBotActive] = useState(false);
  const maxLength = Math.max(userTextList.length, aiTextList.length); // 두 배열의 최대 길이 계산

  const combinedTextList = []; // 두 리스트를 번갈아가며 결합
  for (let i = 0; i < maxLength; i++) {
    if (i < userTextList.length) {
      combinedTextList.push({ type: "user", text: userTextList[i].text });
    }
    if (i < aiTextList.length) {
      combinedTextList.push({ type: "ai", text: aiTextList[i].text });
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
              {combinedTextList.map((item, index) => {
                if (item.type === "user") {
                  return <UserRequest key={index} text={item.text} />;
                } else {
                  return <AiResponse key={index} text={item.text} />;
                }
              })}
            </div>
          </div>
          <TextInput />
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
