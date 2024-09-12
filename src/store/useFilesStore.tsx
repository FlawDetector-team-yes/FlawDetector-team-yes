import { TGithubContent } from "@/app/me/repos/type";
import { fetchRepoContents } from "@/lib/api/github/fetchRepoContents";
import { sortDirOverFiles } from "@/lib/sortDirOverFiles";
import { create } from "zustand";

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
