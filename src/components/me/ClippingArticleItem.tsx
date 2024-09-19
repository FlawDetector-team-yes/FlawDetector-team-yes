"use client";
import { useState, useEffect } from "react";
import db from "@/firebase/firebaseClient";
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore 관련 함수
import ClipPagination from "../vulnerability-db/ClipPagination";
import SortDropdown from "./SortDropdown";
import { useSession } from "next-auth/react";
import fetchPinnedId from "@/firebase/fetchPinnedId"; // pinnedId를 가져오는 함수
import { useSearchParams } from "next/navigation"; // URL 쿼리 파라미터 가져오기

// TArticle 타입 정의
type TArticle = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
};

export default function ClippingArticleItem() {
  const { data: session } = useSession(); // next-auth로 세션 정보 가져오기
  const [firstArticles, setFirstArticles] = useState<TArticle[]>([]);
  const [pinnedArticles, setPinnedArticles] = useState<TArticle[]>([]);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]); // pinnedIds 상태를 문자열 배열로 관리
  const searchParams = useSearchParams(); // URL에서 쿼리 파라미터 가져오기
  const articlesPerPage = 16;

  const page = parseInt(searchParams.get("page") || "1", 10); // 현재 페이지 값 (기본값 1)
  const sort = searchParams.get("sort") || "recent"; // 정렬 값 (기본값 recent)

  // Firestore에서 pinnedIds에 해당하는 문서를 가져오는 함수
  async function getPinnedArticles(pinnedIds: string[]) {
    let articles: TArticle[] = [...firstArticles]; // 처음에 firstArticles 값으로 시작

    try {
      if (firstArticles.length === 0) {
        // firstArticles가 비어 있으면 Firestore에서 데이터를 가져옴
        const q = query(
          collection(db, "vulnerability"),
          where("__name__", "in", pinnedIds),
        );
        const querySnapshot = await getDocs(q);

        articles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          label: doc.data().label,
          title: doc.data().title,
          subtitle: doc.data().subtitle,
        }));

        setFirstArticles(articles); // 처음 데이터를 firstArticles에 저장
      }

      // 정렬 처리
      if (sort === "recent") {
        articles = articles.sort((a, b) =>
          b.subtitle.localeCompare(a.subtitle),
        ); // 최근순
      } else if (sort === "oldest") {
        articles = articles.sort((a, b) =>
          a.subtitle.localeCompare(b.subtitle),
        ); // 오래된 순
      } else if (sort === "report") {
        // 취약성 보고서가 먼저
        articles = [
          ...articles.filter((item) => item.label === "취약성 보고서"),
          ...articles.filter((item) => item.label !== "취약성 보고서"),
        ];
      } else if (sort === "notice") {
        // 취약성 알림이 먼저
        articles = [
          ...articles.filter((item) => item.label === "취약성 알림"),
          ...articles.filter((item) => item.label !== "취약성 알림"),
        ];
      } else if (sort === "etc") {
        // 기타: 보고서나 알림이 아닌 것들 먼저
        articles = [
          ...articles.filter(
            (item) =>
              item.label !== "취약성 보고서" && item.label !== "취약성 알림",
          ),
          ...articles.filter(
            (item) =>
              item.label === "취약성 보고서" || item.label === "취약성 알림",
          ),
        ];
      }

      // 페이지네이션 처리: 해당 페이지에 맞는 데이터만 자르기
      const startIndex = (page - 1) * articlesPerPage;
      const paginatedArticles = articles.slice(
        startIndex,
        startIndex + articlesPerPage,
      );

      setPinnedArticles(paginatedArticles); // 정렬 및 페이지네이션된 데이터 저장
    } catch (error) {
      console.error("Error fetching pinned articles:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (session) {
        // 세션이 있을 때만 pinnedIds를 가져옴
        const ids = await fetchPinnedId(session); // fetchPinnedId 함수가 세션을 받아 ID 배열을 반환
        setPinnedIds(ids); // pinnedIds 상태 업데이트
      }
    }

    fetchData();
  }, [session]);

  // pinnedIds가 업데이트되거나 페이지, 정렬이 바뀔 때 문서 데이터를 가져옴
  useEffect(() => {
    if (pinnedIds.length > 0) {
      getPinnedArticles(pinnedIds); // Firestore에서 문서 가져오기
    }
  }, [pinnedIds, page, sort]);

  return (
    <>
      <div className="mt-14 flex w-full justify-between">
        <div>
          <h1 className="text-[32px] font-medium">Library</h1>
        </div>
        {/* 레포 드롭다운 */}
        <SortDropdown />
      </div>

      {/* Pinned Articles 표시 */}
      <div className="mb-5 grid min-h-[728px] grid-cols-4 gap-4">
        {pinnedArticles.map((item) => (
          <div
            key={item.id}
            className="flex h-[170px] w-[310px] flex-col justify-between rounded-xl border border-solid border-[#C3C3C3] p-7"
          >
            <div className="relative flex h-[30px] justify-between">
              <div
                className={`h-[23px] w-[83px] rounded-full px-1 py-[2px] text-center text-[12px] font-semibold ${
                  item.label === "취약성 알림"
                    ? "bg-[#F2EBFF] text-[#6100FF]"
                    : item.label === "취약성 보고서"
                      ? "bg-[#F1F1F1] text-[#969696]"
                      : "bg-[#FFEFEF] text-[#FF6D6D]"
                }`}
              >
                {/* {item.label} */}
                취약성 알림
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="line-clamp-2 font-['Pretendard'] text-lg font-semibold leading-[33.60px] text-black">
                {item.title}
              </span>
              <span className="text-[14px] font-light text-[#969696]">
                {item.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ClipPagination
        totalPage={Math.ceil(pinnedIds.length / articlesPerPage)}
      />
    </>
  );
}
