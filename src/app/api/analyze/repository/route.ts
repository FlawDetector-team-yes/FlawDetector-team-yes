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
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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
      throw new Error("Failed to fetch repository contents");
    }
    return Response.json(data);
  } catch (e) {
    console.log(e);
  }
}
