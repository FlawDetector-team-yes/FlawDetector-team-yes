/**
 * 주어진 사용자 번호를 기반으로 GitHub 사용자 정보를 가져오는 함수
 *
 * GitHub API를 통해 사용자 정보를 가져온 후,
 * 해당 사용자의 GitHub 로그인 이름을 소문자로 변환하여 반환합니다.
 *
 * @async
 * @function
 * @param {string} userNumber - GitHub 프로필 이미지 URL에서 추출된 사용자 번호
 * @returns {Promise<string | null>} GitHub 로그인 이름을 소문자로 변환한 문자열을 반환.
 *                                   만약 요청이 실패하거나 오류가 발생할 경우 null을 반환.
 * @throws {Error} 사용자 정보를 가져오지 못할 경우 에러를 발생시킴
 */
async function fetchGitHubUserInfo(userNumber: string) {
  const url = `https://api.github.com/user/${userNumber}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("사용자 정보 가져오기 실패");
    }
    const data = await response.json();
    return (data.login as string).replace(/[A-Z]/g, (letter) =>
      letter.toLowerCase(),
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
