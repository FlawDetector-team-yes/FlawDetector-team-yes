"use client";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import db from "./firebaseClient"; // Firestore 초기화된 객체

/**
 * @description 특정 문서를 핀하거나 핀 해제하는 함수
 * @param {string} docId - 핀하거나 해제할 문서의 ID
 * @returns {Promise<void>}
 */
async function useFetchPin(docId: string, session: any) {
  const userName = session?.user?.name;
  console.log(userName);

  if (!userName) {
    console.error("로그인된 유저가 없습니다.");
    return;
  }

  try {
    // 'users' 컬렉션에서 userName이 일치하는 문서 찾기
    const usersCollectionRef = collection(db, "users");
    const userQuery = query(
      usersCollectionRef,
      where("username", "==", userName),
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      console.error("유저 문서를 찾을 수 없습니다.");
      return;
    }

    // 첫 번째 일치하는 문서를 가져옴 (userName이 중복되지 않는다고 가정)
    const userDoc = querySnapshot.docs[0];
    const userDocRef = userDoc.ref; // 문서 참조 가져오기
    const userData = userDoc.data();
    const pins = userData.pins || [];

    // 핀 목록에 docId가 이미 포함되어 있는지 확인
    if (pins.includes(docId)) {
      // 이미 핀된 경우 -> 핀 해제 (배열에서 제거)
      await updateDoc(userDocRef, {
        pins: arrayRemove(docId),
      });
      console.log(`Document ID ${docId} removed from pins`);
    } else {
      // 핀되지 않은 경우 -> 핀 추가 (배열에 추가)
      await updateDoc(userDocRef, {
        pins: arrayUnion(docId),
      });
      console.log(`Document ID ${docId} added to pins`);
    }
  } catch (error) {
    console.error("Firestore에서 핀 상태 업데이트 중 오류 발생:", error);
  }
}

export default useFetchPin;
