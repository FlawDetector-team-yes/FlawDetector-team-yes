import CloseModalButton from "../common/button/CloseModalButton";

function SupportMessageModal() {
  return (
    <div className="flex h-[345px] w-[985px] flex-col items-center justify-center gap-14 overflow-hidden rounded-[40px] border border-[#6100ff] bg-white p-[60px]">
      <div className="flex flex-col items-center justify-center gap-[23px]">
        <div className="text-center font-['Inter'] text-4xl font-bold leading-[54px] text-black">
          문의를 보냈어요!
        </div>
        <div className="font-['Inter'] text-2xl font-medium leading-9 text-[#8e8e8e]">
          문의를 성공적으로 전송했어요. 빠른 시일내에 답변해드릴게요.
        </div>
      </div>
      <CloseModalButton
        buttonText="홈으로 이동"
        className="h-14 w-[335px] bg-primary-500 font-['Inter'] text-xl font-semibold leading-[30px] text-white"
        onClick={() => {
          console.log("모달닫기 버튼작동!!");
        }}
      />
    </div>
  );
}
export default SupportMessageModal;
