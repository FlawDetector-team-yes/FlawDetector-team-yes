import GithubLogin from "@/components/login/GithubLogin";
import MainBackground from "/public/images/MainBackground.svg";

function page() {
  return (
    <article
      className="relative flex h-[1172px] min-w-[1920px] items-center justify-center bg-[110%_auto] bg-no-repeat"
      style={{
        backgroundImage: `url(${MainBackground.src})`,
      }}
    >
      <div className="flex h-[509px] flex-col items-center justify-center gap-[65px]">
        <div className="flex items-center justify-center gap-60">
          <h1 className="flex flex-col items-center gap-5 text-center">
            <span className="text-6xl font-normal tracking-wide text-primary-500">
              Find your Flaw,
            </span>
            <span className="flex h-[110px] items-center justify-center rounded-full border-4 border-primary-500 bg-white px-10 text-center text-6xl font-normal tracking-wide text-primary-500">
              Login
            </span>
          </h1>
          <GithubLogin />
        </div>
      </div>
    </article>
  );
}
export default page;
