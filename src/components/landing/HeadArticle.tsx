import CaretDoubleDown from "./head-article/CaretDoubleDown";

function HeadArticle() {
  const mainBg = `bg-[url('../../public/images/MainBackground.svg')]`;
  return (
    <article
      className={`${mainBg} flex h-[1280px] items-center justify-center bg-cover bg-no-repeat`}
    >
      <div className="inline-flex h-[509px] flex-col items-center justify-center gap-[65px]">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="flex flex-col items-center justify-start gap-5">
            <div className="text-center font-['Inter'] text-6xl font-normal tracking-wide text-primary-500">
              Find your Flaw,
            </div>
            <div className="inline-flex h-[110px] items-center justify-center gap-2.5 rounded-[999px] border-4 border-primary-500 bg-white px-10 text-center font-['Inter'] text-6xl font-normal tracking-wide text-primary-500">
              FlawDetector
            </div>
          </h1>
          <div className="text-center font-['Inter'] text-xl font-normal text-primary-500">
            인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게
            해결하세요.
          </div>
        </div>
        <button className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[999px] bg-primary-500 px-6 py-4 text-center font-['Inter'] text-[28px] font-light text-white">
          Login
        </button>
        <CaretDoubleDown />
      </div>
    </article>
  );
}
export default HeadArticle;
