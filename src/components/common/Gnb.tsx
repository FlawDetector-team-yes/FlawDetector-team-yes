import Image from "next/image";
import Link from "next/link";
/**
 * @TODO 로그인 처리
 * @TODO 글꼴 폰트 적용 및 공용색상 사용으로 변경하기
 */
function Gnb() {
  return (
    <div className="px-20 py-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="./images/bug.svg"
              alt="bug-icon"
              width={34}
              height={34}
            />
            <h1 className="ml-3 mr-24 text-center font-['Aldrich'] text-[40px] font-normal text-black">
              FLAWDETECTOR
            </h1>
          </Link>
          <Link href="/vulnerability-db">취약점 DB</Link>
        </div>
        <Link href="/me">MY 저장소</Link>
      </div>
    </div>
  );
}
export default Gnb;
