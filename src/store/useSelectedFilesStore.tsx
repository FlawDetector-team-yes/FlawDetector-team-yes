import { TSelectedFiles } from "@/app/me/(analyze)/type";
import { create } from "zustand";

type TSelectedFilesState = {
  selectedFiles: TSelectedFiles[];
  folderPath: string;
  moveFolderPath: (path: string) => void;
  selectedAllFile: (selectedAllFiles: TSelectedFiles[]) => void;
  selectFile: (
    type: string,
    name: string,
    sha?: string,
    content?: string,
  ) => void;
  removeFile: (sha: string) => void;
};

/**
 * 선택된 파일 및 폴더 경로를 관리하는 Zustand 상태 훅입니다.
 *
 * 이 훅은 사용자가 선택한 파일과 폴더 경로를 상태로 관리하며, 파일 선택 및 제거, 폴더 경로 이동 기능을 제공합니다.
 *
 * @returns {TSelectedFilesState} - 상태와 상태를 업데이트하는 함수들로 구성된 객체입니다.
 * @property {TSelectedFiles[]} selectedFiles - 현재 선택된 파일들의 배열입니다.
 * @property {string} folderPath - 현재 선택된 폴더의 경로입니다.
 * @property {(path: string) => void} moveFolderPath - 폴더 경로를 업데이트하는 함수입니다.
 * @property {(selectedAllFiles: TSelectedFiles[]) => void} selectedAllFile - 모든 파일을 선택하는 함수입니다.
 * @property {(type: string, name: string, sha?: string, content?: string) => void} selectFile - 파일 또는 폴더를 선택하는 함수입니다.
 * @property {(sha: string) => void} removeFile - 선택된 파일을 제거하는 함수입니다.
 */

const useSelectedFilesStore = create<TSelectedFilesState>((set, get) => ({
  selectedFiles: [],
  folderPath: "src",
  moveFolderPath: (path: string) => set({ folderPath: path }),
  selectedAllFile: (selectedAllFiles: TSelectedFiles[]) =>
    set({ selectedFiles: selectedAllFiles }),
  selectFile: (
    type: string,
    name: string,
    sha: string = "",
    content: string = "",
  ) => {
    const { folderPath } = get();
    // 파일일 경우
    if (type === "file") {
      set((state) => ({
        selectedFiles: [
          ...state.selectedFiles,
          {
            name,
            sha,
            content,
          },
        ],
      }));
    } else {
      // 폴더일 경우
      set({ folderPath: `${folderPath}/${name}` });
    }
  },
  removeFile: (sha: string) => {
    set((state) => ({
      selectedFiles: state.selectedFiles.filter((f) => f.sha !== sha),
    }));
  },
}));

export default useSelectedFilesStore;
