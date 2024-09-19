// store/useVulnerabilityStore.ts
import { create } from "zustand";

type TPinnedState = {
  pinnedId: string[];
  loaded: boolean; // 데이터가 로드되었는지 여부를 나타내는 플래그
  setPinnedId: (data: any[]) => void;
  setLoaded: (loaded: boolean) => void; // 데이터 로드 상태를 설정하는 함수
  togglePinnedId: (id: string) => void; // ID를 추가하거나 삭제하는 함수
};

export const usePinnedStore = create<TPinnedState>((set, get) => ({
  pinnedId: [],
  loaded: false,
  setPinnedId: (pinnedId) => set({ pinnedId, loaded: true }),
  setLoaded: (loaded) => set({ loaded }),

  // ID 토글 함수: 존재하면 삭제, 없으면 추가
  togglePinnedId: (id: string) => {
    const { pinnedId } = get();
    const isPinned = pinnedId.includes(id);

    // ID가 이미 있으면 제거, 없으면 추가
    set({
      pinnedId: isPinned
        ? pinnedId.filter((pinned) => pinned !== id) // 삭제
        : [...pinnedId, id], // 추가
    });
  },
}));
