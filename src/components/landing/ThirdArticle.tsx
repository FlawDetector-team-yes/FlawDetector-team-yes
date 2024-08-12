import Image from "next/image";

function ThirdArticle() {
  const checking = `bg-[url('../../public/images/Checking.svg')]`;
  return (
    <div className="z-0 -mb-10 flex h-full justify-center gap-80 align-middle">
      <Image
        src="./images/Checking.svg"
        alt="Checking"
        width={725}
        height={977}
      />
      <div className="item-middle">
        <div className="inline-flex h-[280px] flex-col items-end justify-center gap-[34px]">
          <h2 className="text-right font-['Inter'] text-6xl font-bold leading-[80px] text-[#6100ff]">
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
    </div>
  );
}
export default ThirdArticle;
