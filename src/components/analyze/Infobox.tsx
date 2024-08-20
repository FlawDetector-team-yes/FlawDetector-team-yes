import Image from "next/image";
import circleSuccess from "../../../public/images/circle-success.png";
import triangleYellow from "../../../public/images/triangle-yellow.png";

type TInfoboxProps = {
  code: string;
  coment: string;
};

/**
 * Infobox 컴포넌트는 분석 결과를 보여주는 박스입니다.
 * @param {Object[]} results - 분석 결과 배열
 * @param {string} results[].code - 코드 텍스트
 * @param {string} results[].coment - 주석 텍스트
 */
function Infobox({ results }: { results: TInfoboxProps[] }) {
  return (
    <div className="flex h-[976px] w-1/2 flex-col items-center gap-8 rounded-lg border border-[#00C308] p-10">
      <div className="flex flex-col items-center gap-6">
        <Image src={circleSuccess} alt="Success" width={44} height={44} />
        <div className="flex h-[50px] w-[550px] items-center justify-center rounded-lg border border-[#00C308] bg-[#E5F8E5] p-3 text-center text-xl font-semibold text-[#00C308]">
          분석완료
        </div>
      </div>
      <ul className="flex w-full flex-col gap-6 overflow-y-auto">
        {results.map((result, idx) => (
          <li
            key={idx}
            className="flex flex-col gap-3 rounded-lg bg-[#f5f5f5] p-5"
          >
            <div className="flex items-center gap-2">
              <Image
                src={triangleYellow}
                alt="Triangle Indicator"
                width={18}
                height={18}
              />
              <p className="text-[18px] font-semibold text-[#525252]">
                {result.code}
              </p>
            </div>
            <p className="text-[16px] text-[#3F3F3F]">{result.coment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Infobox;
