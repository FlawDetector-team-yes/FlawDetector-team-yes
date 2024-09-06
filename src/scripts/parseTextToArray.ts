/**
 * 주어진 문자열을 `" + "` 구분자를 사용하여 배열로 변환하는 함수입니다.
 * @param {string} input - 변환할 문자열입니다. 문자열이 비어있거나 null일 경우 null을 반환합니다.
 * @returns {string[] | null} - 문자열을 배열로 변환한 결과 배열 또는 입력이 없을 경우 null입니다.
 */
export default function parseTextToArray(input: string): string[] | null {
  if (!input) {
    return null;
  }

  const result = input.split(" + ");

  return result;
}
