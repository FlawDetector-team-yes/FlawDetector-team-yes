import { NextResponse } from "next/server";

/**
 * 주어진 사용자 번호를 기반으로 GitHub 사용자 정보를 가져옵니다.
 * GitHub 사용자 이름을 소문자로 변환합니다.
 *
 * @param {string} userNumber - GitHub 프로필 이미지 URL에서 추출된 사용자 번호입니다.
 * @returns {Promise<string | null>} GitHub 사용자 이름의 소문자 버전 또는 오류 발생 시 null입니다.
 */
export async function GET(
  req: Request,
  { params }: { params: { userNumber: string } },
) {
  const { userNumber } = params;
  const url = `https://api.github.com/user/${userNumber}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("사용자 정보 가져오기 실패");
    }
    const data = await response.json();
    const owner = (data.login as string).replace(/[A-Z]/g, (letter) =>
      letter.toLowerCase(),
    );
    return NextResponse.json({ owner });
  } catch (error) {
    console.error(error);
    return null;
  }
}
