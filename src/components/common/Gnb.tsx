import Image from "next/image";
import Link from "next/link";
import bug from "/public/images/bug.svg";
import { logout } from "@/server/user.action";
import { getSession } from "@/lib/getSession";

/**
 * @TODO 로그인 처리
 * @TODO 글꼴 폰트 적용 및 공용색상 사용으로 변경하기
 */
async function Gnb() {
  const session = await getSession();

  return (
    <>
      <div className={`px-20 py-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src={bug} alt="bug-icon" width={34} height={34} />
              <h1 className="ml-3 mr-24 text-center font-['Aldrich'] text-[40px] font-normal text-black">
                FLAWDETECTOR
              </h1>
            </Link>
            <Link href="/vulnerability-db">취약점 DB</Link>
          </div>
          <div className="flex items-center gap-10">
            <Link href="/me">MY 저장소</Link>
            {session !== null && (
              <form action={logout}>
                <button type="submit" className="out-radius-999px px-4 py-2">
                  Logout
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Gnb;
