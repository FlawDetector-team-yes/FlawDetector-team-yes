import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service",
};
function TermsOfServicePage() {
  return (
    <div className="mx-auto mb-[60px] flex w-[65vw] flex-col gap-[20px]">
      <div className="mt-5 rounded-md bg-primary-50/30">
        <h1 className="w-full bg-[url('/images/bg-circles.png')] bg-cover pb-5 pl-5 pt-5 text-2xl font-semibold">
          서비스 이용약관
        </h1>
      </div>
      <div className="flex flex-col gap-5 border-b border-stroke-10 pb-10 text-sm">
        <h2 className="text-lg font-semibold">제1장. 약관 및 계약</h2>
        <h3 className="indent-2 text-base font-semibold">제1조. 목적</h3>
        <pre className="indent-2 leading-6">
          이 이용약관(이하 &quot;본 약관&quot;이라 합니다)은 스팩스페이스(이하
          &quot;회사&quot;라 합니다)이 제공하는 FlawDetector 및 관련 제반
          서비스를 이용함에 있어 회사와 이용자 간의 권리, 의무 및 책임사항, 기타
          필요한 사항을 규정함을 목적으로 합니다.
        </pre>
      </div>
      <div className="flex flex-col gap-5 border-b border-stroke-10 pb-10">
        <h3 className="indent-2 text-base font-semibold">제2조. 용어의 정의</h3>
        <div className="flex flex-col gap-2 indent-2 text-sm">
          <pre>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</pre>
          <pre>
            본 약관에서 사용하는 용어 중 제1항에서 정하지 아니한 것은 관련법령
            및 회사의 정책에서 정하는 바에 따르며, 그 외에는 일반 관례에
            따릅니다.
          </pre>
        </div>

        <div className="flex flex-col gap-2 indent-4 text-sm">
          <pre>
            1. &quot;서비스&quot;라 함은 회사가 운영하는 FlawDetector를 포함하여
            구현되는 단말기와 상관없이 이용자가 이용할 수 있는 서비스를
            의미합니다.
          </pre>
          <pre>
            2. &quot;회원&quot;이란 &quot;회사&quot;의 서비스에 접속하여 본
            약관에 따라 &quot;회사&quot;와 이용계약을 체결하고 제공되는 서비스를
            이용하는 이용자를 말합니다.
          </pre>
          <pre>
            3. &quot;비회원&quot;이란 &quot;회원&quot;으로 가입하지 않고
            제공되는 서비스를 이용하는 이용자를 말합니다.
          </pre>
          <pre>
            4. &quot;이용자&quot;란 사이트 등에 접속하여 본 약관에 따라 제공되느
            서비스를 이용하는 &quot;회원&quot; 및 &quot;비회원&quot;을 말합니다.
          </pre>
          <pre>
            5. &quot;이용계약&quot;이란 본 약관을 포함하여 서비스 이용과
            관련하여 &quot;회사&quot;와 &quot;회원&quot;간에 체결하는 모든
            계약을 말합니다.
          </pre>
          <pre>
            6. &quot;아이디(ID)&quot;라 함은 &quot;회원&quot;의 식별 및 서비스
            이용을 위하여 &quot;회원&quot;이 가입 시 기입한 &quot;회원&quot;의
            이메일 주소를 말합니다.
          </pre>
        </div>
      </div>
      <div className="flex flex-col gap-5 border-b border-stroke-10 pb-10 pt-5 text-sm">
        <h3 className="indent-2 text-base font-semibold">제3조. 약관의 해석</h3>
        <div className="flex flex-col gap-2 indent-4">
          <pre>
            1. 본 약관에서 규정하지 않은 사항은 &quot;약관의 규제에 관한
            법률&quot;, &quot;정보통신망법&quot;, &quot;개인정보보호법&quot;
            등의 관계법령에 따라 규율됩니다.
          </pre>
          <pre>
            2. &quot;회사&quot;는 필요한 경우 개별항목에 대해 약관 또는 정책을
            정할 수 있으며, &quot;회원&quot;은 회사의 정책에 회원가입과 동시에
            동의한 것으로 간주합니다.
          </pre>
          <pre>
            3. &quot;회사&quot;와 개별 계약을 체결할 경우, 서비스 이용과 관련된
            권리 의무는 순차적으로 개별 계약, 개별 서비스 이용약관, 본 약관에
            따라 적용합니다.
          </pre>
        </div>
      </div>
      <div className="flex flex-col gap-5 pt-5 text-sm">
        <h2 className="text-lg font-semibold">제2장. 정보 및 서비스</h2>
        <h3 className="indent-2 text-base font-semibold">
          제4조. 서비스의 이용
        </h3>
        <div className="flex flex-col gap-5 border-b border-stroke-10 pb-10">
          <pre className="indent-2">
            &quot;회사&quot;가 제공하는 서비스의 내용은 다음과 같습니다.
          </pre>
          <div className="flex flex-col gap-2 indent-4">
            <pre>1. 전체 폴더 코드검사 서비스</pre>
            <pre>2. 개별 파일 코드검사 서비스</pre>
            <pre>3. 취약점 관련 뉴스 서비스</pre>
            <pre>4. 채팅 지원 서비스</pre>
            <pre>
              5. 기타 &quot;회사&quot;가 추가 개발하거나 다른 회사와의 제휴계약
              등을 통해 &quot;회원&quot;에게 제공하는 일체의 서비스
            </pre>
          </div>
          <div className="flex flex-col gap-2 indent-2">
            <pre>
              &quot;회사&quot;는 필요한 경우 서비스의 내용을 추가 또는 변경할 수
              있습니다.
            </pre>
            <pre>
              단, 이 경우 &quot;회사&quot;는 추가 또는 변경내용을 약관 개정에
              준하는 방법으로 &quot;회원&quot;에게 공지해야 합니다.
            </pre>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="pt-5 indent-2 text-base font-semibold">
            제5조. 서비스 이용
          </h3>
          <div className="flex flex-col gap-2 indent-4">
            <pre>
              1. &quot;회사&quot;는 특별한 사유가 없는 한 연중무휴, 1일 24시간
              서비스를 제공합니다.
            </pre>
            <pre>
              2. &quot;회사&quot;는 운영상, 기술상의 상당한 이유가 있는 경우에
              서비스를 변경 또는 종료할 수 있습니다.
            </pre>
            <pre>
              3. &quot;회원&quot;은 서비스의 이용에 관하여 관련법률에 특별한
              규정이 없는 한 &quot;회사&quot;에게 별도의 배상 및 보상을 청구할
              수 없습니다.
            </pre>
            <pre>
              변경된 개인정보처리방침은 게시된 날로부터 7일 후부터 효력이
              발생합니다.
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TermsOfServicePage;
