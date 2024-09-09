/**
 * 서버에서 인증 토큰을 가져오는 비동기 함수입니다.
 * @returns {Promise<string | undefined>} - 성공 시 서버에서 받은 액세스 토큰 문자열을 반환합니다. 실패 시 undefined를 반환합니다.
 */
export default async function fetchToken() {
  const url = "http://43.203.238.76:8000/auth/token";

  // 요청에 사용할 데이터 생성
  const data = new URLSearchParams({
    username: process.env.NEXT_PUBLIC_USERNAME,
    password: process.env.NEXT_PUBLIC_PASSWORD,
  });

  try {
    // 인증 요청 보내기
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    });

    // 응답을 JSON으로 파싱
    const responseData = await response.json();

    // access_token 추출
    const accessToken = responseData.access_token;
    console.log(accessToken);

    return accessToken;
  } catch (error) {
    console.error("Error:llama3 fetch 에러:", error);
  }
}
