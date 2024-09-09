/**
 * GitHub 저장소의 특정 경로에서 폴ㄷ 및 파일 콘텐츠를 가져오는 함수
 *
 * 주어진 저장소 소유자, 저장소 이름, 파일 경로를 기반으로 API 요청을 보내고,
 * 해당 경로에 있는 파일 내용을 가져옵니다.
 *
 * @async
 * @function
 * @param {string} owner - GitHub 저장소 소유자의 사용자 이름.
 * @param {string} repo - GitHub 저장소의 이름.
 * @param {string} path - 가져올 파일의 경로.
 * @returns {Promise<TGithubContent[]>} - 파일 내용의 배열을 반환하며,
 *                                        요청 실패 시 빈 배열을 반환합니다.
 * @throws {Error} API 요청이 실패할 경우 에러를 발생시킵니다.
 */
export const fetchRepoContents = async (
  owner: string,
  repo: string,
  path: string,
) => {
  try {
    const response = await fetch(
      `/api/analyze/repository?owner=${owner}&repo=${repo}&path=${path}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch repository contents");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error fetching repository contents:", err);
    return [];
  }
};
