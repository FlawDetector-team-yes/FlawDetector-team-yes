import { create } from "zustand";

export type TUserInfo = {
  email: string | null | undefined;
  username: string | null | undefined;
  profileImg: string | null | undefined;
};

type TUserDataState = {
  userInfo: TUserInfo | null;
  isLoading: boolean;
  bookmarkedRepos: string[];
  toggleBookmarkedRepos: (repoName: string) => void;
  setUserData: (data: TUserInfo) => void;
  setIsLoading: () => void;
};

export const useUserStore = create<TUserDataState>((set, get) => ({
  userInfo: null,
  isLoading: true,
  bookmarkedRepos: [],
  toggleBookmarkedRepos: (repoName: string) => {
    const { bookmarkedRepos } = get();
    const isNewRepo = bookmarkedRepos.indexOf(repoName);

    if (isNewRepo == -1) {
      set((state) => ({
        bookmarkedRepos: [...state.bookmarkedRepos, repoName],
      }));
    } else {
      set((state) => ({
        bookmarkedRepos: state.bookmarkedRepos.filter(
          (repo) => repo !== repoName,
        ),
      }));
    }
  },
  setUserData: (data: TUserInfo) => set({ userInfo: data }),
  setIsLoading: () => set({ isLoading: false }),
}));

export default useUserStore;
