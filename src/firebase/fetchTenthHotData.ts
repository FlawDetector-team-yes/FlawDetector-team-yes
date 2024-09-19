import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import db from "./firebaseClient";

/**
 * @description Firestore의 vulnerability 컬렉션에서 view 필드를 기준으로 내림차순 정렬 후 10번째 문서의 view 값을 반환하는 함수
 * @returns {Promise<number | null>} 10번째 문서의 view 값을 반환하거나 문서가 없으면 null 반환
 */
async function fetchTenthHotView() {
  try {
    // 'vulnerability' 컬렉션에서 view 필드를 기준으로 내림차순 정렬한 후 상위 10개 문서를 가져옴
    const vulnerabilityCollection = collection(db, "vulnerability");
    const querySnapshot = await getDocs(
      query(vulnerabilityCollection, orderBy("view", "desc"), limit(10)),
    );

    // 10번째 문서를 가져옴
    const docs = querySnapshot.docs;
    if (docs.length < 10) {
      console.log("10개 이하의 문서만 존재합니다.");
      return null;
    }

    const tenthDoc = docs[9]; // 10번째 문서

    const tenthDocData = tenthDoc.data();

    // 10번째 문서의 view 필드만 반환
    return tenthDocData.view ?? 0;
  } catch (error) {
    console.error("Firestore에서 문서를 가져오는 중 오류 발생:", error);
    return null;
  }
}

export default fetchTenthHotView;
