import { collection, query, where, getDocs } from "firebase/firestore";
import db from "./firebaseClient"; // Firestore 초기화된 객체
/**
 * @description 현재 로그인한 유저의 userName을 Firestore에서 조회하고, 해당 문서의 pins 필드를 가져오는 함수
 * @returns {Promise<string[] | null>} 핀된 문서 ID 배열을 반환, 없으면 빈 배열 반환
 */
async function fetchPinnedId(session: any) {
  // const session = await getSession();

  console.log(session); //undefined
  const userName = session?.user?.name;

  if (!userName) {
    console.error("로그인된 유저가 없습니다.");
    return [];
  }

  try {
    // 'users' 컬렉션에서 userName이 일치하는 문서 찾기
    const usersCollectionRef = collection(db, "users");
    const userQuery = query(
      usersCollectionRef,
      where("username", "==", userName),
    ); // 'name' 필드가 userName과 일치하는 문서 찾기
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      console.error("유저 문서를 찾을 수 없습니다.");
      return [];
    }

    // 첫 번째 일치하는 문서를 가져옴 (userName이 중복되지 않는다고 가정)
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const pins = userData.pins || [];
    console.log(pins);
    return pins; // pins 필드를 배열로 반환 (없으면 빈 배열)
  } catch (error) {
    console.error("Firestore에서 유저 핀을 가져오는 중 오류 발생:", error);
    return [];
  }
}

export default fetchPinnedId;
