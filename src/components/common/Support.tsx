"use client";
import React, { useState } from "react";

import SupportMessageModal from "../modal/SupportMessageModal";
import useModalStore from "@/store/useModalStore";
import { ContactType } from "@/hook/emailer";

const initialContent = {
  name: "",
  email: "",
  content: "",
};

// 공용 스타일 변수
const inputBaseStyles =
  "w-[866px] flex items-start justify-start gap-2.5 rounded-lg border border-neutral-10 p-3 focus:outline-none";
const inputFocusStyles = "focus:border-[#6100FF]";
const labelStyles = " text-lg font-medium leading-[27px] text-black";

/**
 * `Support` 컴포넌트는 사용자가 문의사항을 작성하여 제출할 수 있는 폼을 제공합니다.
 * 폼은 이름, 이메일, 메시지 필드로 구성되어 있으며, 각 필드는 유효성 검사를 통해 검증됩니다.
 * 제출된 데이터는 처리 로직에 따라 콘솔에 출력되며, 성공적으로 제출되면 모달이 표시됩니다.
 *
 * 유효성 검사는 `zod` 라이브러리를 사용하여 처리되며,
 * `react-hook-form`과 `zodResolver`를 사용해 폼 데이터를 관리합니다.
 *
 * @returns {JSX.Element} 사용자 문의 폼을 렌더링하는 JSX 요소를 반환합니다.
 */
function Support() {
  const [content, setContent] = useState(initialContent);
  const [errors, setErrors] = useState({ name: "", email: "", content: "" });
  // 모달
  const { setIsOpen, setModalContent } = useModalStore();
  //onChange e.target으로 각 각 name email content를 입력받습니다.
  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  //emailer api route POST방식으로 데이터를 요청합니다.
  //그 후 서버에서는 요청값으로 email SMTP서버로 요청합니다.
  async function sendEmailHandler(emailForm: ContactType) {
    const response = await fetch(`/api/email`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(emailForm),
    });
    const data = await response.json();
    return data;
  }

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    //유효성검사
    let isValid = true;
    e.preventDefault();
    const newErrors = { name: "", email: "", content: "" };
    if (content.name.length < 2) {
      newErrors.name = "정확한 이름을 입력해주세요.";
      console.log("실행");
      isValid = false;
    }
    if (!content.email.includes("@")) {
      newErrors.email = "정확한 이메일을 입력해주세요.";
      isValid = false;
    }
    if (content.content.length < 5) {
      newErrors.content = "정확한 메세지를 입력해주세요.";
      isValid = false;
    }
    setErrors(newErrors);
    //유효성통과시 이메일 send
    if (isValid) {
      sendEmailHandler(content);
      setIsOpen && setIsOpen();
      setModalContent && setModalContent(SupportMessageModal);
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="inline-flex w-[985px] flex-col items-start justify-start gap-8 rounded-[40px] border border-primary-500 bg-white p-[60px]"
      noValidate
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-start gap-[23px]">
        <h2 className="text-center text-2xl font-bold leading-9 text-black">
          문의하기
        </h2>
        <p className="text-base font-medium leading-normal text-[#8e8e8e]">
          문의하고싶은 내용을 구체적으로 작성해주셔야 피드백이 정상적으로
          반영됩니다.
        </p>
      </div>

      {/* Name Field */}
      <div className="flex flex-col items-start justify-start gap-2">
        <label className={labelStyles} htmlFor="name">
          Name
        </label>
        <input
          onChange={onChangeHandler}
          id="name"
          name="name"
          value={content.name}
          className={`${inputBaseStyles} ${inputFocusStyles} ${errors.name ? "border-red-500" : ""} `}
          placeholder="이름을 적어주세요."
        />

        {errors?.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div className="flex flex-col items-start justify-start gap-2">
        <label className={labelStyles} htmlFor="email">
          Email
        </label>
        <input
          onChange={onChangeHandler}
          id="email"
          name="email"
          value={content.email}
          type="email"
          className={`${inputBaseStyles} ${inputFocusStyles} bg-[#f0f0f0]`}
          placeholder="justin@floatfactory.kr"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      {/* Message Field */}
      <div className="flex flex-col items-start justify-start gap-2">
        <label className={labelStyles} htmlFor="message">
          Message
        </label>
        <textarea
          onChange={onChangeHandler}
          id="message"
          name="content"
          value={content.content}
          className={`${inputBaseStyles} ${inputFocusStyles} ${errors.content ? "border-red-500" : ""} h-[226px] resize-none`}
          placeholder="내용을 적어주세요."
        />
        {errors.content && <p className="text-red-500">{errors.content}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex h-[53px] w-[866px] items-center justify-center gap-2.5 rounded-lg bg-primary-500"
      >
        <span className="text-lg font-semibold leading-[27px] text-white">
          문의 보내기
        </span>
      </button>
    </form>
  );
}

export default Support;
