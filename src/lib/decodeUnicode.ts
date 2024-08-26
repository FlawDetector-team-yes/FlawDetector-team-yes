/**
 * 주어진 Base64 인코딩된 문자열을 유니코드 문자열로 디코딩합니다.
 *
 * 이 함수는 문자열을 다음과 같은 단계로 변환합니다:
 * 1. Base64로 인코딩된 문자열을 디코딩하여 바이너리 데이터를 얻습니다.
 * 2. 바이너리 데이터를 퍼센트 인코딩 형식으로 변환합니다.
 * 3. 퍼센트 인코딩된 문자열을 다시 원래의 유니코드 문자열로 변환합니다.
 *
 * @param {string} str - Base64로 인코딩된 문자열. 이 문자열은 유니코드 문자열을 Base64로 인코딩한 것입니다.
 * @returns {string} - 디코딩된 유니코드 문자열.
 */
export function decodeUnicode(str: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}
