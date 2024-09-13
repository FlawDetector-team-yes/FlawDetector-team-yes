function PrivacyPolicyPage() {
  return (
    <div className="mx-auto mb-[70px] flex w-[65vw] flex-col gap-[20px]">
      <div className="mt-5 rounded-md bg-primary-50/30">
        <h1 className="w-full bg-[url('/images/bg-circles.png')] bg-cover pb-5 pl-5 pt-5 text-2xl font-semibold">
          개인정보 처리방침
        </h1>
      </div>

      <div className="flex flex-col gap-5 text-sm">
        <pre>
          스팩스페이스 (이하 "회사")는 개인정보를 소중하게 생각하고 개인정보를
          보호하기 위하여 최선을 다하고 있습니다.
        </pre>
        <pre>
          "회사"는 본 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가
          어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한
          조치가 취해지고 있는지 알려드리고자 합니다.
        </pre>
        <pre>
          본 개인정보처리방침은 정부의 법률 및 지침 변경이나 "회사"의 내부 방침
          변경 등으로 인하여 수시로 변경될 수 있으며, 변경될 경우 변경된
          개인정보처리방침을 "회사"가 제공하는 서비스 페이지에 공지하도록
          하겠습니다.
        </pre>
        <pre className="pt-10 font-semibold">
          "회사"의 개인정보처리방침은 다음과 같은 내용을 포함하고 있습니다.
        </pre>
      </div>
      <div className="border-b border-stroke-10 pb-10">
        <ul className="flex flex-col gap-1 indent-5 text-sm">
          <li>1. 개인정보의 수집 및 이용 목적, 항목 및 수집방법</li>
          <li>2. 개인정보의 제공 및 처리위탁</li>
          <li>3. 개인정보 수집·이용의 거부 시 불이익</li>
          <li>4. 개인정보 보유 및 이용기간</li>
          <li>5. 개인정보의 파기절차 및 방법</li>
          <li>6. 회원의 권리와 행사 방법</li>
          <li>7. 개인정보 자동 수집 장치의 설치/운영 및 거부에 관한 사항</li>
          <li>8. 개인정보 보호를 위한 기술적/관리적 대책</li>
          <li>9. 개인정보 관리 책임자의 성명, 연락처, 부서</li>
          <li>10. 권익침해 구제방법</li>
          <li>11. 고지의 의무</li>
        </ul>
      </div>
      <div className="flex flex-col gap-5 border-b border-stroke-10 pb-10 pt-5 text-sm">
        <h2 className="text-xl font-semibold">
          1. 개인정보 수집의 이용 목적, 항목 및 수집방법
        </h2>
        <ul className="flex flex-col gap-1 indent-5">
          <li>
            1. “개인정보”란 생존하는 개인에 관한 정보로서 당해 개인을 식별할 수
            있는 정보를 말합니다.
          </li>
          <li>2. "회사"는 수집된 개인정보를 다음의 목적을 위해 활용합니다. </li>
        </ul>
        <ul className="flex flex-col gap-1 indent-10">
          <li>
            a. 회원가입 및 의사소통에 관한 사항: 회원 본인확인, 부정 가입방지,
            가입 의사확인, 고충상담 및 처리, 불만처리 등 민원처리 등
          </li>
          <li>b. 서비스 제공에 관한 사항: 코드 검사 서비스 제공</li>
          <li>
            c. 서비스 개선, 신규 서비스 개발, 서비스의 유효성 확인, 서비스 분석
            및 서비스 이용환경 개선
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-5 pt-5 text-sm">
        <h2 className="text-xl font-semibold">2. 권익침해 구제방법</h2>
        <div className="flex flex-col gap-5 border-b border-stroke-10 pb-10">
          <pre>
            이용자는 개인정보침해로 인한 구제를 받기 위하여
            개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에
            분쟁해결이나 상담 등을 신청할 수 있습니다.
          </pre>
          <pre>
            이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에
            문의하시기 바랍니다.
          </pre>
          <ul className="flex flex-col gap-1 indent-5">
            <li>
              1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972
              (www.kopico.go.kr)
            </li>
            <li>
              2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
            </li>
            <li>3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
            <li>4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="pt-5 text-xl font-semibold">3. 고지의 의무</h2>
          <div className="flex flex-col gap-2">
            <pre>
              회사는 개인정보처리방침이 변경되는 경우에는 “회사”의 사이트
              “공지사항”을 통하여 변경 및 시행의 시기, 변경 내용을 공지합니다.
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
export default PrivacyPolicyPage;
