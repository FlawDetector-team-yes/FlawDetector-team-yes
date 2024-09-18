import CardList from "./card/CardList";
import CaretDoubleDownWhite from "./head-article/CaretDoubleDownWhite";

/**
 * Landing Page의 네번 째 아티클 -
 * `CardArticle` 컴포넌트는 "안전과 보호"를 강조하는 메시지와 함께 여러 개의 카드 리스트를 보여주는 섹션을 렌더링합니다.
 * 이 섹션은 배경 색상이 설정되어 있으며, 중앙에 제목과 애니메이션이 적용된 카드 리스트가 표시됩니다.
 *
 * @returns {JSX.Element} 안전과 보호를 강조하는 섹션을 렌더링하는 JSX 요소를 반환합니다.
 */
function CardArticle() {
  return (
    <section className="relative z-10 h-[1280px] overflow-hidden bg-primary-500 pt-36">
      <div className="absolute bottom-[100px] left-1/2">
        <CaretDoubleDownWhite />
      </div>
      <div className="relative top-[-80px] flex h-[1025px] flex-col items-center justify-center gap-[121px]">
        <h2 className="text-center text-6xl font-bold leading-[80px] text-white">
          안전과 보호를 우선으로 하는
          <br />
          프로세스를 제공합니다.
        </h2>
        <div className="flex w-full max-w-[1920px] animate-slide-right gap-12">
          {[...Array(4)].map((_, index) => (
            <CardList key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardArticle;
