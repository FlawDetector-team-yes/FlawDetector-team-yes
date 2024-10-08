import { getSession } from "@/lib/getSession";
import Link from "next/link";

/**
 * `LoginButton` 컴포넌트는 로그인 페이지로 이동하는 링크 버튼을 렌더링합니다.
 *
 * @returns {JSX.Element} 로그인 페이지로 이동하는 버튼을 렌더링하는 JSX 요소를 반환합니다.
 */
async function LoginButton() {
  const session = await getSession();

  return (
    <>
      {session !== null ? (
        <Link
          href="/me"
          className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary-500 px-6 py-4 text-[28px] font-light text-white"
        >
          파일 분석하러 가기
        </Link>
      ) : (
        <Link
          href="/login"
          className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary-500 px-6 py-4 text-[28px] font-light text-white"
        >
          Login
        </Link>
      )}
    </>
  );
}
export default LoginButton;
