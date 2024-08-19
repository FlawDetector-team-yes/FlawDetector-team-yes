import Support from "../common/Support";

function ServiceArticle() {
  return (
    <article className="flex h-[1280px] min-w-[1880px] items-center justify-center">
      <div className="flex h-[817px] items-center justify-start gap-[124px]">
        <div className="flex h-[808px] flex-col items-start justify-between">
          <div className="flex flex-col gap-[30px] text-left">
            <h2 className="text-6xl font-bold leading-[80px] text-primary-500">
              서비스 이용에
              <br />
              문제가 생겼나요?
            </h2>
            <p className="text-xl font-medium text-[#969696]">
              이용하면서 문제가 생겼다면 언제든지 문의주세요.
              <br />
              서비스 개발과 성장에 큰 도움이 됩니다.
            </p>
          </div>
          <div className="flex flex-col gap-[51px]">
            <ContactInfo label="Email" value="justin@floatfactory.kr" />
            <ContactInfo
              label="Address"
              value="서울 강서구 마곡중앙2로 11 305호"
            />
          </div>
        </div>
        <Support />
      </div>
    </article>
  );
}
export type ContactInfo = {
  label: string;
  value: string;
};
//ContactInfo 컴포넌트
const ContactInfo = ({ label, value }: ContactInfo) => (
  <div className="flex flex-col gap-2">
    <div className="text-left text-xl font-semibold leading-[30px] text-[#3f3f3f]">
      {label}
    </div>
    <div className="text-left text-lg font-normal leading-[27px] text-[#969696]">
      {value}
    </div>
  </div>
);

export default ServiceArticle;
