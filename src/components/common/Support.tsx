function Support() {
  return (
    <div className="inline-flex w-[985px] flex-col items-start justify-start gap-8 rounded-[40px] border border-[#6100ff] bg-white p-[60px]">
      <div className="flex h-[83px] flex-col items-start justify-start gap-[23px]">
        <div className="text-center font-['Inter'] text-2xl font-bold leading-9 text-black">
          문의하기
        </div>
        <div className="font-['Inter'] text-base font-medium leading-normal text-[#8e8e8e]">
          문의하고싶은 내용을 구체적으로 작성해주셔야 피드백이 정상적으로
          반영됩니다.
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <div className="font-['Inter'] text-lg font-medium leading-[27px] text-black">
          Name
        </div>
        <div className="inline-flex w-[866px] items-start justify-start gap-2.5 rounded-lg border border-[#e6e6e6] p-3">
          <div className="font-['Inter'] text-lg font-medium leading-[27px] text-[#d5d5d5]">
            이름을 적어주세요.
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <div className="font-['Inter'] text-lg font-medium leading-[27px] text-black">
          Email
        </div>
        <div className="inline-flex w-[866px] items-start justify-start gap-2.5 rounded-lg border border-[#e6e6e6] bg-[#f0f0f0] p-3">
          <div className="font-['Inter'] text-lg font-medium leading-[27px] text-[#c5c5c5]">
            justin@floatfactory.kr
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2">
        <div className="font-['Inter'] text-lg font-medium leading-[27px] text-black">
          Message
        </div>
        <div className="inline-flex h-[226px] w-[866px] items-start justify-start gap-2.5 rounded-lg border border-[#e6e6e6] p-3">
          <div className="font-['Inter'] text-lg font-medium leading-[27px] text-[#d5d5d5]">
            내용을 적어주세요.
          </div>
        </div>
      </div>
      <div className="inline-flex h-[53px] w-[866px] items-center justify-center gap-2.5 rounded-lg bg-[#6100ff]">
        <div className="font-['Inter'] text-lg font-semibold leading-[27px] text-white">
          문의 보내기
        </div>
      </div>
    </div>
  );
}
export default Support;
