import { create } from "zustand";
import { TReposState } from "@/store/useAnalyzeStore";

type Text = {
  id: string;
  text: string;
};
type TextStore = {
  userTextList: Text[];
  aiTextList: Text[];
  resultFolderList: TReposState[];
  loading: boolean;
  setReposState: (repo: TReposState[]) => void;
  addUserText: (text: string) => void;
  addAiText: (text: string) => void;
  setLoading: () => void;
};

const chatBotStore = create<TextStore>((set) => ({
  userTextList: [],
  aiTextList: [],
  resultFolderList: [],
  loading: false,

  addUserText: (text: string) =>
    set((prev) => ({
      userTextList: [...prev.userTextList, { id: "", text: text }],
    })),
  addAiText: (data: string) =>
    set((prev) => ({
      aiTextList: [...prev.aiTextList, { id: "", text: data }],
    })),

  setReposState: (result: TReposState[]) =>
    set((prev) => ({
      resultFolderList: [
        ...prev.resultFolderList,
        ...result.filter(
          (newItem) =>
            !prev.resultFolderList.some(
              (name) => name.repoName === newItem.repoName,
            ),
        ),
      ],
    })),
  setLoading: () => set((state) => ({ loading: !state.loading })),
}));

export default chatBotStore;
