import Image from "next/image";
import bugDecoIcon from "/public/images/bug-deco.svg";

/**
 * Landing Page의 두 번째 아티클 -
 * `SecondArticle` 컴포넌트는 코드 보안 관리의 중요성을 강조하는 내용을 담고 있는 섹션을 렌더링합니다.
 * 이 섹션은 큰 제목, 코드 보안 관련 질문, 그리고 플로디텍터의 장점을 설명하는 문구로 구성되어 있습니다.
 * 또한, 시각적 요소로 `bugDecoIcon` 이미지를 포함합니다.
 *
 * @returns {JSX.Element} 코드 보안 관리와 관련된 정보를 표시하는 섹션을 렌더링하는 JSX 요소를 반환합니다.
 */
function SecondArticle() {
  return (
    <article className="flex min-w-[1880px] items-center justify-center bg-primary-50">
      <div
        id="target-section"
        className="flex h-[1280px] gap-[350px] p-[60px] text-left"
      >
        <div className="flex flex-col items-start justify-center gap-[60px]">
          <h2 className="text-[80px] font-bold text-primary-500">
            쉽고 편하게 <br />
            취약점을 발견하다
          </h2>
          <div className="flex flex-col gap-7">
            <div className="text-[32px] font-bold text-[#3f3f3f]">
              코드 보안
              <br />
              어떻게 관리하시나요?
            </div>
            <p className="text-xl font-medium text-[#969696]">
              플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로, <br />
              코드의 보안 취약점을 사전에 수정함으로써
              <br />
              개발자들에게 편의와 안전한 개발 환경을 제공합니다.
            </p>
          </div>
        </div>
        <Image src={bugDecoIcon} alt="bugDecoIcon" width={710} height={1022} />
      </div>
    </article>
  );
}

export default SecondArticle;
