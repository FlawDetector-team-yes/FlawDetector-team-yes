import Image from "next/image";

function SecondArticle() {
  return (
    <div
      id="target-section"
      className="item-middle h-[1280px] gap-[350px] bg-primary-50"
    >
      <div className="inline-flex flex-col items-start justify-center gap-[60px] text-left">
        <h2 className="font-['Inter'] text-[80px] font-bold text-primary-500">
          쉽고 편하게 <br />
          취약점을 발견하다
        </h2>
        <div className="flex flex-col items-start justify-start gap-7">
          <div className="font-['Inter'] text-[32px] font-bold text-[#3f3f3f]">
            코드 보안
            <br />
            어떻게 관리하시나요?
          </div>
          <p className="font-['Inter'] text-xl font-medium text-[#969696]">
            플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로, <br />
            코드의 보안 취약점을 사전에 수정함으로써
            <br />
            개발자들에게 편의와 안전한 개발 환경을 제공합니다.
          </p>
        </div>
      </div>
      <Image
        src="./images/BugAndDeco.svg"
        alt="BugAndDeco"
        width={710}
        height={1022}
      />
    </div>
  );
}
export default SecondArticle;
