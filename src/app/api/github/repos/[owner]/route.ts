/**
 * 주어진 GitHub 사용자(owner)의 레포지토리 목록을 가져옵니다.
 * 레포지토리 이름과 생성 날짜를 반환합니다.
 *
 * @param {Request} req - HTTP 요청 객체입니다.
 * @param {Object} params - URL에서 추출한 파라미터 객체입니다.
 * @param {string} params.owner - GitHub 사용자 이름입니다.
 * @returns {Promise<Response>} 레포지토리 이름과 생성 날짜를 포함한 배열을 JSON 형식으로 반환합니다.
 * @throws {Error} GitHub API 요청 실패 시 에러를 발생시킵니다.
 */
export async function GET(
  req: Request,
  { params }: { params: { owner: string } },
) {
  try {
    const { owner } = params;
    const res = await fetch(`https://api.github.com/users/${owner}/repos`);
    const data = await res.json();
    const result = data.map((repo: any) => {
      // 필요한 정보, name(레포 이름), createdAt(생성날짜)
      return { name: repo.name, createdAt: repo.created_at };
    });
    return Response.json(result);
  } catch (e) {
    console.log(e);
  }
}
