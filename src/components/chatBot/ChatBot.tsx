"use client";

import chat from "../../../public/images/chat.png";
import Image from "next/image";
import chatActive from "../../../public/images/chat-active.png";
import { useState } from "react";

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
