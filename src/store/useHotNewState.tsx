// store/useVulnerabilityStore.ts
import { create } from "zustand";

type THotNewState = {
  isHot: boolean;
  isNew: boolean;
  setIsHot: () => void;
  setIsNew: () => void;
};

export const useHotNewStore = create<THotNewState>((set) => ({
  isHot: true,
  isNew: false,
  setIsHot: () => set({ isHot: true, isNew: false }),
  setIsNew: () => set({ isHot: false, isNew: true }),
}));
