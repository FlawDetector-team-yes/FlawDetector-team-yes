import { userInfo } from "os";
import { create } from "zustand";

export type TUserInfo = {
  email: string | null | undefined;
  username: string | null | undefined;
  profileImg: string | null | undefined;
  owner: string | null | undefined;
};

type TUserDataState = {
  userInfo: TUserInfo | null;
  isLoading: boolean;
  setUserData: (data: TUserInfo) => void;
  setIsLoading: () => void;
};

export const useUserStore = create<TUserDataState>((set) => ({
  userInfo: null,
  isLoading: true,
  setUserData: (data: TUserInfo) => set({ userInfo: data }),
  setIsLoading: () => set({ isLoading: false }),
}));

export default useUserStore;
