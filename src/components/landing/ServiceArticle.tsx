import Support from "../common/Support";

function ServiceArticle() {
  return (
    <article className="item-middle h-[1280px]">
      <div className="inline-flex h-[817px] items-center justify-start gap-[124px]">
        <div className="inline-flex h-[808px] flex-col items-start justify-between">
          <div className="flex flex-col items-start justify-start gap-[30px] text-left">
            <h2 className="font-['Inter'] text-6xl font-bold leading-[80px] text-primary-500">
              서비스이용에
              <br />
              문제가 생겼나요?
            </h2>
            <p className="font-['Inter'] text-xl font-medium text-[#969696]">
              이용하면서 문제가 생겼다면 언제든지 문의주세요.
              <br />
              서비스 개발과 성장에 큰 도움이 됩니다.
            </p>
          </div>
          <div className="flex flex-col items-start justify-start gap-[51px]">
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="text-center font-['Inter'] text-xl font-semibold leading-[30px] text-[#3f3f3f]">
                Email
              </div>
              <div className="text-center font-['Inter'] text-lg font-normal leading-[27px] text-[#969696]">
                justin@floatfactory.kr
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="text-center font-['Inter'] text-xl font-semibold leading-[30px] text-[#3f3f3f]">
                Adress
              </div>
              <div className="text-center font-['Inter'] text-lg font-normal leading-[27px] text-[#969696]">
                서울 강서구 마곡중앙2로 11 305호
              </div>
            </div>
          </div>
        </div>
        <Support />
      </div>
    </article>
  );
}
export default ServiceArticle;
