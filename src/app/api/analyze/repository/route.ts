import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // 동적 렌더링을 강제

/**
 * 주어진 요청에 따라 GitHub 리포지토리의 특정 경로에 있는 콘텐츠를 가져오는 함수.
 *
 * @async
 * @function GET
 * @param {Request} request - 들어오는 HTTP 요청 객체.
 * @returns {Promise<Response>} - 리포지토리 콘텐츠의 JSON 데이터를 포함하는 Response 객체를 반환하는 Promise.
 * @throws {Error} - GitHub API 요청에 실패한 경우 에러를 던짐.
 *
 * @example
 * // 요청 URL 예시:
 * // https://api.github.com/repos/{owner}/{repo}/contents/{path}
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");
    const path = searchParams.get("path");

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKENS}`,
        Accept: "application/vnd.github+json",
      },
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch repository contents" }),
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Failed to fetch repository contents" }),
      { status: 500 },
    );
  }
}
