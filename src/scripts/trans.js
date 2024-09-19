/**
 * 서버에 메시지를 전송하고 응답을 받아오는 비동기 핸들러 함수입니다.
 * @param {string} message - 서버에 전송할 사용자 메시지. 메시지가 없으면 null을 반환합니다.
 * @param {string} token - API 요청에 필요한 인증 토큰입니다.
 * @returns {Promise<string|null>} - 서버로부터 받은 응답 텍스트 또는 에러 발생 시 null입니다.
 */
export default async function handler(message, token) {
  const url = "http://43.203.238.76:8000/generate";

  const data = {
    user_message: `${message} When 【 appears, replace it with [. When 】 appears, replace it with ] `,
    temperature: 0.9,
    top_p: 0.9,
  };

  if (!message) {
    return null;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
