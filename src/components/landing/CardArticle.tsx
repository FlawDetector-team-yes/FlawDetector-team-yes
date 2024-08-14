import CardList from "./card/CardList";

function CardArticle() {
  return (
    <div className="item-middle relative z-10 h-[1280px] overflow-hidden bg-primary-500 pt-36">
      <div className="inline-flex h-[1025px] flex-col items-center justify-center gap-[121px]">
        <div className="text-center font-['Inter'] text-6xl font-bold leading-[80px] text-white">
          안전과 보호를 우선으로 하는
          <br />
          프로세스를 제공합니다.
        </div>
        <div className="inline-flex h-[1500px] w-[1920px] animate-slide-right gap-12">
          <CardList />
          <CardList />
          <CardList />
          <CardList />
        </div>
      </div>
    </div>
  );
}
export default CardArticle;
