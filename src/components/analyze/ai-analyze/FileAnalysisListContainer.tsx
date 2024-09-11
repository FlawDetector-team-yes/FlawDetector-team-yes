"use client";

import FileAnalysisSideBar from "./FileAnalysisSideBar";
import FileAnalysisList from "./FileAnalysisList";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/firebase/firebaseClient";
import { useSession } from "next-auth/react";
import {
  TAnalyzeFileResult,
  useAnalyzeFileResultStore,
  useFormattedResStore,
  useResSelectedStore,
} from "@/store/useAnalyzeStore";
import ResCodeViewer from "./ResCodeViewer";

function FileAnalysisListContainer() {
  const { data: session } = useSession();
  const { id } = useParams();
  const setAnalyzeFileResult = useAnalyzeFileResultStore(
    (state) => state.setAnalyzeFileResult,
  );
  const resSelected = useResSelectedStore((state) => state.resSelected);
  const setResSelected = useResSelectedStore((state) => state.setResSelected);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState(0); // 측정된 첫 번째 section의 높이

  useEffect(() => {
    // 첫 번째 section의 크기를 측정하여 state에 저장하는 함수
    const updateSidebarHeight = () => {
      if (sidebarRef.current) {
        const rect = sidebarRef.current.getBoundingClientRect();
        setSidebarHeight(rect.height);
      }
    };

    // 페이지 로드 및 리사이즈 시 높이 업데이트
    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);

    return () => {
      window.removeEventListener("resize", updateSidebarHeight);
    };
  }, []);

  // fireStore 결과 조회
  useEffect(() => {
    const getResultData = async () => {
      try {
        const allUserRef = collection(db, "users");
        const currUser = query(
          allUserRef,
          where("email", "==", session?.user?.email),
        );

        // 현재 유저의 users 가져오기
        const userDocs = await getDocs(currUser);

        if (!userDocs.empty) {
          // 해당 유저의 데이터 가져오기
          const userData = userDocs.docs[0].data();

          const analysisResults = userData.analyzeFileResult || [];

          // analyzeFileResult 배열에서 repoName이 현재 id와 일치하는 데이터만 필터링
          const filteredResults = analysisResults.filter(
            (res: TAnalyzeFileResult) => res.repoName === id, // repoName이 현재 params의 id와 일치하는지 확인
          )[0];

          setAnalyzeFileResult(filteredResults);
          // 선택 안되어있을 경우, 첫번째 데이터를 기본 값을 지정해준다.
          setResSelected(filteredResults.data[0]);
        } else {
          console.log("일치하는 유저가 없습니다.");
        }
      } catch (error) {
        console.error("데이터를 불러올 수 없습니다.: ", error);
      }
    };

    getResultData();
  }, [session]);

  return (
    <>
      <section ref={sidebarRef}>
        <FileAnalysisSideBar />
      </section>
      <div
        className="flex w-full flex-col gap-8"
        style={{ height: sidebarHeight }}
      >
        <ResCodeViewer />
        <FileAnalysisList />
      </div>
    </>
  );
}
export default FileAnalysisListContainer;
