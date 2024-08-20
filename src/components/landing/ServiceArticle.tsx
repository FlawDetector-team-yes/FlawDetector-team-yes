import Support from "../common/Support";
export type ContactInfo = {
  label: string;
  value: string;
};
/**
 * ServiceArticle에서만 사용되는 반복되는 코드를 줄이기 위한 컴포넌트입니다.
 * @param {ContactInfo} props - `label`과 `value` 속성을 포함한 연락처 정보.
 * @returns {JSX.Element} 연락처 정보를 표시하는 JSX 요소를 반환합니다.
 */
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
/**
 * Landing Page의 마지막 아티클, /me/service Page에 사용 -
 * 서비스 이용 중 문제가 발생한 경우, 사용자가 문의할 수 있는 정보를 제공하는 섹션을 렌더링합니다.
 *
 * 이름, 이메일, 메세지를 필수로 입력해주어 문의를 할 수 있습니다.
 * @returns {JSX.Element} 서비스 문의 섹션을 렌더링하는 JSX 요소를 반환합니다.
 */
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
export default ServiceArticle;
