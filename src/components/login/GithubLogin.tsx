import Image from "next/image";
import githubImg from "/public/images/github.svg";
import { github } from "@/server/user.action";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "@/firebase/firebaseClient";

/**
 * `GithubLogin` 컴포넌트는 GitHub 소셜 로그인을 위한 버튼을 렌더링합니다.
 * 사용자가 버튼을 클릭하면 GitHub 로그인 기능이 실행될 예정입니다.
 * 현재 `onClick` 핸들러는 빈 함수로 정의되어 있으며,
 * 실제 GitHub 로그인 기능은 추후 구현 예정입니다.
 *
 * @returns {JSX.Element} GitHub 로그인 버튼을 렌더링하는 JSX 요소를 반환합니다.
 */
async function GithubLogin() {
  const session = await getSession();
  console.log(JSON.stringify(session));

  // 로그인 되면 랜딩페이지로 이동
  if (session !== null) {
    const docRef = collection(db, "users");

    const q = query(docRef, where("email", "==", session.user?.email));
    const isRegistered = (await getDocs(q)).docs[0]?.data();

    if (!isRegistered) {
      await addDoc(docRef, {
        username: session.user?.name,
        email: session.user?.email,
        profileImg: session.user?.image,
      });
    }

    redirect("/");
  }

  return (
    <form action={github}>
      <button
        type="submit"
        className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[999px] bg-[#6100ff] px-6 py-4 text-center font-['Inter'] text-[28px] font-light text-white"
      >
        <Image src={githubImg} alt="githubImg" width={40} height={40} />
        Github로 연동 로그인하기
      </button>
    </form>
  );
}
export default GithubLogin;
