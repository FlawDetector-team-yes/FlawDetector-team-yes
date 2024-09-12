"use client";
import Image from "next/image";
import textSubmit from "../../../public/images/chatBot-submit.svg";
import React, { useRef, useState, useEffect } from "react";
import chatBotStore from "../../store/chatBotStore";

export default function TextInput() {
  const { addUserText, userTextList, addAiText, aiTextList } = chatBotStore();
  //입력창 높이
  const [scrollChecked, setScrollChecked] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(25);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //llm 소통을 위한 텍스트
  const [text, setText] = useState<string>("");
  //Ai 텍스트 값
  const [aiTextResponse, setAiTextResponse] = useState<string>("");
  const textarea = textareaRef.current;
  function scrollHandler() {
    //텍스트입력 높이
    if (textarea) {
      if (textarea.scrollHeight > textarea.clientHeight) {
        console.dir(textarea);
        setScrollChecked(true);
        if (scrollChecked) {
          setTextareaHeight((prevHeight) => {
            const newHeight = prevHeight + 15;
            return newHeight >= 100 ? 100 : newHeight;
          });
        }
      }
    }
  }

  //llm소통
  async function onSubmit() {
    const res = await fetch(`http://localhost:3000/api/chatBot`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(text),
    });

    const data = await res.json();

    setAiTextResponse(data);
    setTextareaHeight(25);
  }

  function textHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (text !== e.target.value) {
      setText(e.target.value);
    }
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addUserText(text); // textList 상태가 갱신될 때까지 대기
    setText("");
    await onSubmit();
  }
  async function handlerKey(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      addUserText(text); // textList 상태가 갱신될 때까지 대기
      setText("");
      await onSubmit();
    }
  }

  useEffect(() => {
    if (aiTextResponse !== "") {
      addAiText(aiTextResponse);
      console.log(aiTextList);
    }
  }, [aiTextResponse]);

  //인라인스타일적용이유.
  //동적 값이 변경될 때 Tailwind가 이를 인식하지 못해서 스타일이 적용되었다가 사라지는 현상이 발생
  return (
    <>
      <div className="solid w-[558px] rounded-b-3xl border-t-[1px] bg-[#ffffff] p-5">
        <form onSubmit={onSubmitHandler}>
          <div className="flex items-center justify-center gap-[10px] rounded-[40px] bg-[#F8F8F9] px-[12px] py-[16px]">
            <textarea
              ref={textareaRef}
              className="flex w-full resize-none items-center bg-[#F8F8F9] pr-2 text-[#000000] outline-none"
              style={{ height: `${textareaHeight}px` }}
              placeholder="챗봇에게 궁굼한 점을 물어보세요!"
              onInput={scrollHandler}
              onChange={textHandler}
              onKeyDown={handlerKey}
              value={text}
            />

            <button type="submit">
              <Image src={textSubmit} width={40} height={40} alt="텍스트입력" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
