import CaretDoubleDown from "./head-article/CaretDoubleDown";

function HeadArticle() {
  return (
    <article
      className="relative flex h-[1280px] items-center justify-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/images/MainBackground.svg')" }}
    >
      <div className="flex h-[509px] flex-col items-center justify-center gap-[65px]">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="flex flex-col items-center gap-5 text-center">
            <div className="text-6xl font-normal tracking-wide text-primary-500">
              Find your Flaw,
            </div>
            <div className="flex h-[110px] items-center justify-center gap-2.5 rounded-full border-4 border-primary-500 bg-white px-10 text-6xl font-normal tracking-wide text-primary-500">
              FlawDetector
            </div>
          </h1>
          <div className="text-xl font-normal text-primary-500">
            인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게
            해결하세요.
          </div>
        </div>
        <button className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary-500 px-6 py-4 text-[28px] font-light text-white">
          Login
        </button>
        <CaretDoubleDown />
      </div>
    </article>
  );
}

export default HeadArticle;
