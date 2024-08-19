import CaretDoubleDown from "./CaretDoubleDown";
import LoginButton from "./LoginButton";

function HeadArticle() {
  return (
    <article
      className="relative flex h-[1172px] min-w-[1920px] items-center justify-center bg-[100%_auto] bg-no-repeat"
      style={{
        backgroundImage: "url('/images/MainBackground.svg')",
      }}
    >
      <div className="flex h-[509px] flex-col items-center justify-center gap-[65px]">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="flex flex-col items-center gap-5 text-center">
            <span className="text-6xl font-normal tracking-wide text-primary-500">
              Find your Flaw,
            </span>
            <span className="flex h-[110px] items-center justify-center gap-2.5 rounded-full border-4 border-primary-500 bg-white px-10 text-6xl font-normal tracking-wide text-primary-500">
              FlawDetector
            </span>
          </h1>
          <div className="text-xl font-normal text-primary-500">
            인공지능의 뛰어난 분석 능력을 활용하여 코드의 보안 취약점을 신속하게
            해결하세요.
          </div>
        </div>
        <LoginButton />
        <CaretDoubleDown />
      </div>
    </article>
  );
}

export default HeadArticle;
