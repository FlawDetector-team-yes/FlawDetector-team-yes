import { TGithubContent } from "@/app/me/(analyze)/type";
import { sortDirOverFiles } from "@/lib/sortDirOverFiles";
import { create } from "zustand";

/**
 * GitHub 저장소의 특정 경로에서 파일 콘텐츠를 가져오는 함수입니다.
 *
 * 이 함수는 주어진 저장소와 경로에 대한 API 요청을 수행하여 파일 내용을 가져옵니다.
 *
 * @param {string} owner - GitHub 저장소 소유자의 사용자 이름.
 * @param {string} repo - GitHub 저장소의 이름.
 * @param {string} path - 가져올 파일의 경로.
 * @returns {Promise<TGithubContent[]>} - API 요청의 결과로 얻어진 파일 내용의 배열입니다. 요청이 실패하면 빈 배열을 반환합니다.
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

type TFileState = {
  files: TGithubContent[];
  fecthFiles: (owner: string, repo: string, path: string) => Promise<void>;
};

/**
 * GitHub 저장소 파일 상태를 관리하는 Zustand 상태 관리 훅입니다.
 *
 * 이 훅은 저장소의 파일 목록을 상태로 관리하며, 파일을 가져오는 기능을 제공합니다.
 *
 * @returns {TFileState} - 상태와 상태를 업데이트하는 함수들로 구성된 객체입니다.
 * @property {TGithubContent[]} files - 현재 상태에서 관리하는 파일 내용의 배열입니다.
 * @property {(owner: string, repo: string, path: string) => Promise<void>} fecthFiles - 주어진 저장소와 경로에 대해 파일을 가져오는 비동기 함수입니다.
 */
const useFilesStore = create<TFileState>((set) => ({
  files: [],
  fecthFiles: async (owner: string, repo: string, path: string) => {
    const data = await fetchRepoContents(owner, repo, path);
    const sortedData = sortDirOverFiles(data);
    set({ files: sortedData });
  },
}));

export default useFilesStore;
