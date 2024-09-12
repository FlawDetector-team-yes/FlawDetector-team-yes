import { create } from "zustand";

type Text = {
  id: string;
  text: string;
};
type TextStore = {
  userTextList: Text[];
  aiTextList: Text[];
  addUserText: (text: string) => void;
  addAiText: (text: string) => void;
};

const chatBotStore = create<TextStore>((set) => ({
  userTextList: [],
  aiTextList: [],
  addUserText: (text: string) =>
    set((prev) => ({
      userTextList: [...prev.userTextList, { id: "", text: text }],
    })),
  addAiText: (data: string) =>
    set((prev) => ({
      aiTextList: [...prev.aiTextList, { id: "", text: data }],
    })),
}));

export default chatBotStore;
