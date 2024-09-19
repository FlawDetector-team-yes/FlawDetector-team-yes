"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SupportMessageModal from "../modal/SupportMessageModal";
import useModalStore from "@/store/useModalStore";

// 유효성 검사
const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  email: z.string().email("유효한 이메일을 입력해주세요."),
  message: z.string().min(1, "메시지를 입력해주세요."),
});

type FormData = z.infer<typeof schema>;

// 공용 스타일 변수
const inputBaseStyles =
  "w-[866px] flex items-start justify-start gap-2.5 rounded-lg border border-neutral-10 p-3 focus:outline-none";
const inputFocusStyles = "focus:border-[#6100FF]";
const labelStyles =
  "font-['Inter'] text-lg font-medium leading-[27px] text-black";

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
  // 모달
  const { setIsOpen, setModalContent } = useModalStore();

  // Form 관련 로직
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setIsOpen && setIsOpen();
    setModalContent && setModalContent(SupportMessageModal);
    //console.log(data);
    // 여기서 데이터 처리
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="inline-flex w-[985px] flex-col items-start justify-start gap-8 rounded-[40px] border border-primary-500 bg-white p-[60px]"
    >
      {/* Header */}
      <div className="flex flex-col items-start justify-start gap-[23px]">
        <h2 className="text-center font-['Inter'] text-2xl font-bold leading-9 text-black">
          문의하기
        </h2>
        <p className="font-['Inter'] text-base font-medium leading-normal text-[#8e8e8e]">
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
          id="name"
          className={`${inputBaseStyles} ${inputFocusStyles} ${errors.name ? "border-red-500" : ""}`}
          placeholder="이름을 적어주세요."
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div className="flex flex-col items-start justify-start gap-2">
        <label className={labelStyles} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={`${inputBaseStyles} ${inputFocusStyles} bg-[#f0f0f0] ${errors.email ? "border-red-500" : ""}`}
          placeholder="justin@floatfactory.kr"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* Message Field */}
      <div className="flex flex-col items-start justify-start gap-2">
        <label className={labelStyles} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          className={`${inputBaseStyles} ${inputFocusStyles} h-[226px] ${errors.message ? "border-red-500" : ""}`}
          placeholder="내용을 적어주세요."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex h-[53px] w-[866px] items-center justify-center gap-2.5 rounded-lg bg-primary-500"
      >
        <span className="font-['Inter'] text-lg font-semibold leading-[27px] text-white">
          문의 보내기
        </span>
      </button>
    </form>
  );
}

export default Support;
