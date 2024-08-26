import { TGithubContent } from "@/app/me/(analyze)/type";

/**
 * 주어진 항목 배열을 정렬하여 디렉토리(`dir`) 항목이 파일(`file`) 항목보다 먼저 오도록 합니다.
 *
 * @param {TGithubContent[]} items - 정렬할 항목들의 배열입니다. 각 항목은 `TGithubContent` 타입이어야 합니다.
 * @returns {TGithubContent[]} - 디렉토리 항목이 파일 항목보다 먼저 오는 정렬된 배열을 반환합니다.
 *
 * 정렬 기준:
 * - `type`이 `"dir"`인 항목이 `type`이 `"file"`인 항목보다 먼저 오도록 합니다.
 * - 두 항목의 `type`이 동일할 경우, 순서를 변경하지 않습니다.
 */
export const sortDirOverFiles = (items: TGithubContent[]) => {
  return items.sort((a, b) => {
    if (a.type === "dir" && b.type === "file") {
      return -1; // a가 b보다 먼저 오게
    }
    if (a.type === "file" && b.type === "dir") {
      return 1; // b가 a보다 먼저 오게
    }
    return 0; // 같은 타입이면 순서를 변경하지 않음
  });
};
