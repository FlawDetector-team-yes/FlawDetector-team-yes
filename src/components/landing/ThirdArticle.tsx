import Image from "next/image";
import CheckingImg from "../../../public/images/Checking.svg";

/**
 * Landing Page의 세 번째 아티클 -
 * `ThirdArticle` 컴포넌트는 두 개의 주요 요소로 구성된 섹션을 렌더링합니다.
 * 이 섹션은 하나의 이미지와 두 개의 텍스트 블록을 포함하고 있으며,
 * 최신 보안 동향을 실시간으로 확인할 수 있는 메시지를 전달합니다.
 *
 * @returns {JSX.Element} 렌더링된 `ThirdArticle` 컴포넌트를 반환합니다.
 */
function ThirdArticle() {
  return (
    <div className="relative z-0 flex h-[1280px] min-w-[1880px] items-center justify-center gap-80">
      <Image src={CheckingImg} alt="Checking" width={725} height={977} />
      <div className="flex h-[280px] flex-col items-end justify-center gap-[34px]">
        <h2 className="text-right font-['Inter'] text-6xl font-bold leading-[80px] text-primary-500">
          최신 보안 동향을
          <br />
          실시간으로 확인하세요.
        </h2>
        <p className="text-right font-['Inter'] text-xl font-medium text-[#969696]">
          실시간으로 최신 보안 동향을 제공하여
          <br />
          개발자들이 보안 취약점에 대한 최신 정보를 받을 수 있어
          <br />
          보안 강화를 위한 코딩 관행을 지속적으로 개선할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default ThirdArticle;
