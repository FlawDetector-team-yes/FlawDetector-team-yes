import { userInfo } from "os";
import { create } from "zustand";

export type TuserInfo = {
  email: string | null | undefined;
  username: string | null | undefined;
  profileImg: string | null | undefined;
};

type TUserDataState = {
  userInfo: TuserInfo | null;
  setUserData: (data: TuserInfo) => void;
};

export const userInfoStore = create<TUserDataState>((set) => ({
  userInfo: null,
  setUserData: (data: TuserInfo) => set({ userInfo: data }),
}));

export default userInfoStore;
