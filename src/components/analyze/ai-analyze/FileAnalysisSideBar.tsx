"use client";

import Image from "next/image";
import fileImg from "../../../../public/images/file.png";
import xMarkError from "../../../../public/images/x-mark-error.png";
import triangleYellow from "../../../../public/images/triangle-yellow.png";
import circleGreen from "../../../../public/images/circle-green.png";
import menuRepoFolder from "../../../../public/images/menu-repo-folder.png";
import {
  useAnalyzeFileResultStore,
  useFormattedResStore,
  useResSelectedStore,
} from "@/store/useAnalyzeStore";
import StateItem from "../StateItem";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { securityResDummyData, suggestResDummyData } from "./dummydata";

/**
 * `FileAnalysisSideBar` 컴포넌트는 사이드바에 분석 파일 목록을 표시합니다.
 * 각 파일은 아이콘과 함께 파일 이름이 나열됩니다.
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {TAnalysisResult[]} props.analysisResults - 분석 결과 배열
 * @returns {JSX.Element} - 사이드바 파일 목록 구성 요소
 */
export default function FileAnalysisSideBar() {
  const { id } = useParams();
  const analyzeFileResult = useAnalyzeFileResultStore(
    (state) => state.analyzeFileResult,
  );
  const setResSelected = useResSelectedStore((state) => state.setResSelected);
  const resSelected = useResSelectedStore((state) => state.resSelected);
  const [onClick, setOnClick] = useState<{
    sha: string;
    name: string;
    state: boolean;
  }>({
    sha: "",
    name: "",
    state: true,
  });
  const suggestRes = useFormattedResStore((state) => state.suggestRes);
  const securityRes = useFormattedResStore((state) => state.securityRes);
  const setSuggestRes = useFormattedResStore((state) => state.setSuggestRes);
  const setSecurityRes = useFormattedResStore((state) => state.setSecurityRes);

  useEffect(() => {
    if (resSelected?.result) {
      const result = `${resSelected.result}`.trim(); // resSelected에서 result를 가져옴
      console.log(result); // 데이터가 잘 들어오는지 확인

      try {
        // 보안 취약점 부분을 JSON 형식으로 변환
        let cleanedResult = result
          .replace(/securityRes=\[/g, '"securityRes": [')
          .replace(/suggestRes=\[/g, ',"suggestRes": [')
          .replace(/,\s*}/g, "}")
          .replace(/,\s*\]/g, "]")
          .replace(/\\n/g, "")
          .replace(/\\\"/g, '"')
          .replace(/\s+/g, " ")
          .trim();

        // 특정 키 (title, description, code, line)에만 쌍따옴표 추가
        cleanedResult = cleanedResult.replace(
          /(\{|,)\s*(title|description|code|line):/g, // 중괄호나 쉼표 다음에 나오는 키에 대해
          '$1 "$2":', // 키에 쌍따옴표 추가
        );

        // 첫 번째 불필요한 따옴표 및 공백 제거
        cleanedResult = cleanedResult.replace(/^\s*"\s*/, "");

        // 마지막에 남아있는 잘못된 따옴표와 쉼표 제거
        cleanedResult = cleanedResult.replace(/"\s*$/, "");

        // 중괄호 끝 쉼표 수정 (},] -> }])
        cleanedResult = cleanedResult.replace(/},\s*];/g, "}]");

        // 마지막 배열의 세미콜론 제거 (]; -> ])
        cleanedResult = cleanedResult.replace(/];\s*$/, "]");

        // 마지막 객체의 쉼표 제거 (},], -> }]로 처리)
        cleanedResult = cleanedResult.replace(/,\s*([\}\]])/g, "$1");

        // code 부분 처리: 중첩된 따옴표 및 콜론을 =로 변환, 백슬래시 이스케이프 처리
        cleanedResult = cleanedResult.replace(
          /"code":\s*"([^"]*)"/g,
          (match, p1) => {
            const updatedCode = p1
              .replace(/"/g, "") // 내부 따옴표 제거
              .replace(/:\s*/g, " = ") // 콜론을 =로 변환
              .replace(/\\/g, "\\\\"); // 백슬래시 이스케이프 처리
            return `"code": "${updatedCode}"`;
          },
        );

        // JSON.parse가 가능한 형태로 만들기 위해 cleanedResult를 {}로 감싸서 변환
        const finalResult = `{${cleanedResult}}`;

        console.log("Final JSON String:", finalResult);

        // JSON.parse를 사용해 문자열을 객체로 변환
        const parsedData = JSON.parse(finalResult);
        console.log("Parsed Data:", parsedData);

        // 보안 취약점 데이터 추출
        const securityData = parsedData.securityRes || [];
        const suggestData = parsedData.suggestRes || [];

        // Zustand store에 데이터 업데이트
        setSecurityRes(securityData);
        setSuggestRes(suggestData);
      } catch (error) {
        console.error("파싱 오류:", error);
        setSecurityRes(securityResDummyData);
        setSuggestRes(suggestResDummyData);
      }
    }
  }, [resSelected]);

  const onClickFile = (f: {
    sha: string;
    name: string;
    result: string;
    content: string;
  }) => {
    setOnClick((prev) => ({
      ...prev,
      sha: f.sha,
      name: f.name,
      state: !prev.state,
    }));

    setResSelected(f);
  };

  // 상태 확인용 콘솔 로그
  useEffect(() => {
    console.log("Updated suggestRes:", suggestRes);
  }, [suggestRes]);

  useEffect(() => {
    console.log("Updated securityRes:", securityRes);
  }, [securityRes]);

  return (
    <>
      <aside className="flex max-h-fit w-[247px] flex-col justify-between gap-5">
        <div className="flex h-fit w-[246px] flex-col justify-evenly gap-6 rounded-lg border-[1px] border-[#C3C3C3] p-5">
          <StateItem
            src={xMarkError}
            alt="검출된 취약점"
            count={
              securityRes.length === 0
                ? securityResDummyData.length
                : securityRes.length
            }
          />
          <StateItem
            src={triangleYellow}
            alt="수정 제안"
            count={
              suggestRes.length === 0
                ? suggestResDummyData.length
                : suggestRes.length
            }
          />
          <StateItem src={circleGreen} alt="문제 없음" count={0} />
        </div>
        <div className="h-[994px] w-[247px] scroll-smooth rounded-xl border-[1px] border-[#C3C3C3]">
          <div className="flex h-[70px] justify-between rounded-t-xl bg-primary-50 p-5">
            <div className="flex items-center gap-[10px] text-xl">
              <img
                className="rounded-full"
                src="https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg"
                alt="Profile Image"
                width={30}
                height={30}
              />
              <p>{sessionStorage.getItem("owner")}</p>
            </div>
            <div className="flex items-center">
              <Image
                src={menuRepoFolder}
                width={14}
                height={6.5}
                alt="Menu Repo Folder"
              />
            </div>
          </div>
          <ul className="rounded-sm">
            {/* 분석 결과  */}
            {analyzeFileResult?.data?.map((f) => (
              <li
                key={f.sha}
                onClick={() => onClickFile(f)}
                className={`flex h-[44px] cursor-pointer items-center gap-2 border border-[#E6E6E6] p-2 ${
                  onClick.sha === f.sha &&
                  onClick.name === f.name &&
                  onClick.state
                    ? "bg-[#E3E1E7]"
                    : "hover:bg-[#E3E1E7]"
                }`}
              >
                <button className="flex gap-1">
                  <Image src={fileImg} alt="File" width={24} height={24} />
                  <span>{f.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Link href={`/me/repos/${id}`}>
          <button className="fill-radius-8px h-[56px] w-[246px] text-xl">
            추가 검사 하기
          </button>
        </Link>
      </aside>
    </>
  );
}
