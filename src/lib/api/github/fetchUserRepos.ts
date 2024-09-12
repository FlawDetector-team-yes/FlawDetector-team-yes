/**
 * 사용자의 GitHub 레포지토리 목록을 가져오는 함수
 *
 * 주어진 사용자의 GitHub API 엔드포인트를 호출하여 해당 사용자의 레포지토리 데이터를 가져옴.
 * API 호출 중 발생할 수 있는 오류는 try-catch 문을 통해 처리되며,
 * 에러가 발생할 경우 콘솔에 로그를 출력함.
 *
 * @async
 * @function
 * @param {string} owner - GitHub 레포지토리 소유자의 이름 (사용자명)
 * @returns {Promise<any>} API 호출의 응답 데이터를 반환함.
 *                          레포지토리 목록 데이터를 포함하거나, 오류가 발생한 경우 undefined 반환.
 */
export const fetchUserRepos = async (owner: string) => {
  try {
    if (owner) {
      const res = await (await fetch(`api/github/repos/${owner}`)).json();
      return res;
    }
  } catch (e) {
    console.log(e);
  }
};
