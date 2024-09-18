import {
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import db from "./firebaseClient";

/**
 * @description Firestore의 realTimeTopics 컬렉션에 데이터를 추가하거나, 동일한 content가 있으면 count를 +1 해주는 함수
 * 48시간 이상 지난 데이터를 삭제하는 로직도 추가됨.
 * @param {string} content - 추가하려는 주제 내용
 * @returns {Promise<void>} Firestore에 문서를 추가하거나 업데이트
 */
async function addOrUpdateRealTimeTopic(content: string) {
  try {
    const topicsCollectionRef = collection(db, "realTimeTopics");

    // 현재 시간에서 48시간 이전의 타임스탬프 계산
    const now = Timestamp.now();
    const cutoff = new Date(now.toDate().getTime() - 48 * 60 * 60 * 1000); // 48시간 이전
    const cutoffTimestamp = Timestamp.fromDate(cutoff);

    // 48시간이 지난 문서를 삭제하는 쿼리
    const oldTopicsQuery = query(
      topicsCollectionRef,
      where("createdAt", "<", cutoffTimestamp),
    );
    const oldTopicsSnapshot = await getDocs(oldTopicsQuery);

    // 48시간 지난 문서 삭제
    oldTopicsSnapshot.forEach(async (docSnap) => {
      await deleteDoc(docSnap.ref);
    });

    // 'realTimeTopics' 컬렉션에서 동일한 content가 있는지 확인하는 쿼리
    const q = query(topicsCollectionRef, where("content", "==", content));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // 동일한 content가 있을 경우 count를 +1 업데이트
      querySnapshot.forEach(async (docSnap) => {
        const docRef = docSnap.ref;
        await updateDoc(docRef, {
          count: increment(1),
        });
      });
    } else {
      // 동일한 content가 없을 경우 새로운 문서를 추가하고 count는 1로 설정, createdAt을 추가
      await addDoc(topicsCollectionRef, {
        content,
        count: 1,
        createdAt: Timestamp.now(), // 현재 시간을 타임스탬프로 기록
      });
    }
  } catch (error) {
    console.error("Error adding or updating real-time topic:", error);
  }
}

export default addOrUpdateRealTimeTopic;
