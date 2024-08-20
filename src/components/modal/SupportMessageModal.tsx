import CloseModalButton from "../common/button/CloseModalButton";

/**
 * 문의하기 후 사용자에게 전송 완료 메시지를 표시하는 모달 컴포넌트입니다.
 * 이 모달은 문의가 성공적으로 전송되었음을 알리고, 사용자가 홈으로 이동할 수 있는 버튼을 제공합니다.
 *
 * @returns {JSX.Element} 문의 전송 완료 메시지와 홈으로 이동하는 버튼이 포함된 모달 요소를 반환합니다.
 */
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
