import CardList from "./card/CardList";

function CardArticle() {
  return (
    <section className="relative z-10 h-[1280px] overflow-hidden bg-primary-500 pt-36">
      <div className="flex h-[1025px] flex-col items-center justify-center gap-[121px]">
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
