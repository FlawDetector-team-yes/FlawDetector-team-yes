import db from "@/firebase/firebaseClient";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

/**
 * Firestore의 "vulnerability" 컬렉션에 데이터를 추가하는 비동기 함수입니다.
 * 만약 주어진 subtitle이 이미 존재하면 데이터를 추가하지 않습니다.
 * @param {string} title - 추가할 데이터의 제목입니다.
 * @param {string} subtitle - 추가할 데이터의 부제목입니다.
 * @param {string} content - 추가할 데이터의 내용입니다.
 * @param {string[]} arrayTable - 추가할 데이터의 배열 테이블입니다.
 * @returns {Promise<void>} - 데이터 추가가 완료된 후에는 아무것도 반환하지 않습니다.
 */
export default async function addDataToFirebase(
  title,
  subtitle,
  content,
  arrayTable,
) {
  try {
    const vulnerabilityRef = collection(db, "vulnerability"); // Firestore의 컬렉션 참조 생성

    // Firestore에서 동일한 subtitle을 가진 문서를 조회하는 쿼리 생성
    const q = query(vulnerabilityRef, where("subtitle", "==", subtitle));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // 동일한 subtitle이 없다면 새로운 데이터를 Firestore에 추가
      await addDoc(vulnerabilityRef, { title, subtitle, content, arrayTable });
      console.log("새로운 subtitle이 Firestore에 추가되었습니다.");
    } else {
      console.log("같은 subtitle이 이미 Firestore에 존재합니다.");
    }
  } catch (error) {
    // 데이터 처리 중 오류가 발생한 경우 콘솔에 에러 출력
    console.error("데이터 처리 중 오류 발생:", error);
  }
}
