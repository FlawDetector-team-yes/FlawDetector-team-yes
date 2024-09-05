import { userInfo } from "os";
import { create } from "zustand";

export type TuserInfo = {
  email: string | null | undefined;
  username: string | null | undefined;
  profileImg: string | null | undefined;
};

type TUserDataState = {
  userInfo: TuserInfo | null;
  isLoading: boolean;
  setUserData: (data: TuserInfo) => void;
  setIsLoading: () => void;
};

export const useUserStore = create<TUserDataState>((set) => ({
  userInfo: null,
  isLoading: true,
  setUserData: (data: TuserInfo) => set({ userInfo: data }),
  setIsLoading: () => set({ isLoading: false }),
}));

export default useUserStore;
