"use client";
import Image from "next/image";
import textSubmit from "../../../public/images/chatBot-submit.svg";
import React, { useRef, useState, useEffect } from "react";
import chatBotStore from "../../store/chatBotStore";
import { TReposState, useReposStateStore } from "@/store/useAnalyzeStore";
import { DetailContentProps } from "@/types/vulnerability";

export default function TextInput({ detailData }: DetailContentProps) {
  const { addUserText, addAiText, setLoading, setReposState, loading } =
    chatBotStore();
  const { reposState } = useReposStateStore();
  //입력창 높이
  const [scrollChecked, setScrollChecked] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(25);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //llm 소통을 위한 텍스트
  const [text, setText] = useState<string>("");
  //Ai 텍스트 값
  const [aiTextResponse, setAiTextResponse] = useState<string>("");
  const textarea = textareaRef.current;
  const [checked, setChecked] = useState(false);
  function scrollHandler() {
    //텍스트입력 높이
    if (textarea) {
      if (textarea.scrollHeight > textarea.clientHeight) {
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
  //문제점.fetch 함수 검사결과 따로 불리하기.
  // text ==== 검사결과일때만 실행되게하기
  // 전역스토어에서 검사결과가 완료된 name이 같으면 전역에 넣지않기 이거는 전역 스토어에서 막아줘야할수도 있다.
  function codeResultHandler() {
    setChecked(!checked);
    let res: TReposState[] = reposState.filter(
      (state) => state.state === "finish",
    );
    if (res.length !== 0) {
      return setReposState(res);
    } else {
      return setAiTextResponse("검사이력이 없습니다.");
    }
  }
  async function onSubmit() {
    setLoading();
    const message = `
      보고서제목:${detailData?.title}
      보고서내용:${detailData?.content} 
      사용자질문:${text}
      사용자가 질문을 하였습니다. 사용자가 인사(안녕,하이, 안녕하세요 등 인삿말을 하지 않았다면)질문에 대한 대답을 바로 해줘. 보고서제목이랑보고서 내용을 잘 읽어보고 이 보고서에 대해서 대답해주세요. 모든 대화는 높임말로 해주세요. 만약 질문이 인사나 일반적인 대화라면 친근하고 예의 바르게 답변해 주세요. 예를 들어, "안녕하세요?"라는 질문에는 "안녕하세요! 무엇을 도와드릴까요?"라고 응답하세요.
      똑같은 응답은 절대 금지입니다. 만약 질문이 보고서 내용과 관련된 것이라면 정중하고 친근하게 답변해 주세요. 만약 사용자 질문이 보고서와 관련이 없다면, "죄송하지만, 저는 보고서와 관련된 질문에만 답변드릴 수 있어요. 다른 궁금한 점이 있으면 언제든지 말씀해 주세요!"라고 응답해 주세요.
      사용자가 감사인사(고마워,ㄱㅅ,도와줘서 고마워,감사,감사합니다)라는 질문을 했을시 해결되었다니 정말 다행이네요:) 라고 답변해주세요.
      `;
    const res = await fetch(`/api/chatBot`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();

    setAiTextResponse(data);
    setLoading();
    setChecked(!checked);

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
    if (text === "검사결과") {
      codeResultHandler();
    } else {
      await onSubmit();
    }
  }
  async function handlerKey(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      addUserText(text); // textList 상태가 갱신될 때까지 대기
      setText("");

      if (text === "검사결과") {
        return codeResultHandler();
      } else {
        await onSubmit();
      }
    }
  }

  useEffect(() => {
    if (aiTextResponse !== "") {
      addAiText(aiTextResponse);
    }
  }, [checked]);

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
