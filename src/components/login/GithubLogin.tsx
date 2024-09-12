import Image from "next/image";
import githubImg from "/public/images/github.svg";
import { github } from "@/server/user.action";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import db from "@/firebase/firebaseClient";
import { Session } from "next-auth";
import { fetchGitHubUserInfo } from "@/lib/api/github/fetchUserInfo";

/**
 * 사용자가 Firestore 데이터베이스에 등록되어 있는지 확인하고, 등록되지 않은 경우 새로 등록합니다.
 * 프로필 이미지 URL에서 사용자 번호를 추출하고, 가능할 경우 추가적인 GitHub 사용자 정보를 가져옵니다.
 *
 * @param {Session} session - 현재 사용자 세션으로 사용자 정보를 포함합니다.
 * @returns {Promise<void>} 사용자 등록 과정이 완료될 때까지의 Promise입니다.
 */
async function registerUserIfNeeded(session: Session) {
  const docRef = collection(db, "users");
  const email = session.user?.email;
  const q = query(docRef, where("email", "==", email));
  const existingUser = (await getDocs(q)).docs[0]?.data();

  if (!existingUser) {
    const profileImg = session.user?.image;
    const userNumber = profileImg
      ? profileImg.match(/u\/(\d+)/)?.[1] || null
      : null;

    let owner = null;
    if (userNumber) {
      // GitHub 사용자 정보 가져오기
      owner = await fetchGitHubUserInfo(userNumber);
    }

    await addDoc(docRef, {
      username: session.user?.name,
      email,
      profileImg,
      userNumber,
      owner,
    });
  }
}

/**
 * GitHub 소셜 로그인 버튼을 렌더링하는 컴포넌트입니다.
 * 사용자가 버튼을 클릭하면 GitHub 로그인 기능이 실행됩니다.
 *
 * @returns {JSX.Element} GitHub 로그인 버튼을 렌더링하는 JSX 요소입니다.
 */
async function GithubLogin() {
  const session = await getSession();

  if (session !== null) {
    // Firestore에 사용자 등록 여부 확인
    await registerUserIfNeeded(session);
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
