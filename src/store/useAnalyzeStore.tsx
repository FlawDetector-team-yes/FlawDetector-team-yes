import { create } from "zustand";

// worker
export type TWorkerStore = {
  workers: Worker[];
  addWorker: (worker: Worker) => void;
  clearWorkers: () => void;
};

export const useWorkerStore = create<TWorkerStore>((set, get) => ({
  workers: [],
  addWorker: (worker) =>
    set((state) => ({ workers: [...state.workers, worker] })),
  clearWorkers: () => {
    get().workers.forEach((worker) => worker.terminate());
    set({ workers: [] });
  },
}));

// step
export type TStepStore = {
  currentStep: string;
  setCurrentStep: (step: string) => void;
};

export const useStepStore = create<TStepStore>((set) => ({
  currentStep: "select",
  setCurrentStep: (step: string) => {
    set((state: any) => ({
      ...state,
      currentStep: step,
    }));
  },
}));

// progress
export type TAnalyzeFiles = {
  fileId: string; // fileId를 넣어줘
  progressValue: number; // percent를 넣어줘
  state: string; // progress, complete와 같은 status를 넣어줘
};

type TAnalyzeFilesStore = {
  analyzeFiles: TAnalyzeFiles[];
  resetAnlyzeFliles: () => void;
  setAnalyzeFiles: (files: TAnalyzeFiles) => void;
};

// Progress Store 생성
export const useAnalyzeFilesStore = create<TAnalyzeFilesStore>((set) => ({
  analyzeFiles: [],
  resetAnlyzeFliles: () => set({ analyzeFiles: [] }),
  setAnalyzeFiles: (files: TAnalyzeFiles) => {
    set((state) => {
      // 기존 progress 배열에서 동일한 fileId를 가진 항목을 제거
      const updatedProgress = state.analyzeFiles.filter(
        (p) => p.fileId !== files.fileId,
      );
      // 새로운 progress 항목을 추가
      return {
        analyzeFiles: [...updatedProgress, files],
      };
    });
  },
}));

// result
export type TResultData = {
  sha: string;
  name: string;
  path?: string;
  content: string;
  result: string; // 결과 저장
};

type TResultDataStore = {
  resultData: TResultData[];
  resetResultData: () => void;
  setResultData: (res: TResultData) => void;
};

// Result Store 생성
export const useResultDataStore = create<TResultDataStore>((set) => ({
  resultData: [],
  resetResultData: () => set({ resultData: [] }),
  setResultData: (res: TResultData) => {
    set((state) => {
      // 기존 resultData 배열에서 동일한 sha를 가진 항목을 제거
      const updatedResults = state.resultData.filter((r) => r.sha !== res.sha);
      // 새로운 resultData 항목을 추가
      return {
        resultData: [...updatedResults, res],
      };
    });
  },
}));

// repoId로 묶은 결과 데이터
export type TAnalyzeFileResult = {
  repoId: string;
  repoName: string;
  data: TResultData[];
};

type TAnalyzeFileResultStore = {
  analyzeFileResult: TAnalyzeFileResult;
  setAnalyzeFileResult: (res: TAnalyzeFileResult) => void;
};

// Result Store 생성
export const useAnalyzeFileResultStore = create<TAnalyzeFileResultStore>(
  (set) => ({
    analyzeFileResult: {
      repoId: "",
      repoName: "",
      data: [],
    },
    setAnalyzeFileResult: (res: TAnalyzeFileResult) => {
      set((state) => ({
        ...state,
        analyzeFileResult: res,
      }));
    },
  }),
);

// repos state
export type TReposState = {
  repoId: string;
  repoName: string;
  state: string;
};

export type TReposStateStore = {
  reposState: TReposState[];
  setReposState: (repo: TReposState) => void;
};

export const useReposStateStore = create<TReposStateStore>((set) => ({
  reposState: [],
  setReposState: (repo: TReposState) => {
    set((state) => {
      // 기존 repoState 배열에서 동일한 fileId를 가진 항목을 제거
      const updatedState = state?.reposState.filter(
        (r) => r.repoName !== repo.repoName,
      );
      // 새로운 state 항목을 추가
      return {
        reposState: [...updatedState, repo],
      };
    });
  },
}));

// 검사 완료 시간 저장
type TSaveTimeStore = {
  saveTime: string;
  setSaveTime: (t: string) => void;
};

export const useSaveTimeStore = create<TSaveTimeStore>((set) => ({
  saveTime: "",
  setSaveTime: (t: string) => {
    set((state) => ({
      ...state,
      saveTime: t,
    }));
  },
}));

type TResSelectedStore = {
  resSelected: TResultData;
  setResSelected: (f: TResultData) => void;
};

export const useResSelectedStore = create<TResSelectedStore>((set) => ({
  resSelected: { sha: "", name: "", content: "", result: "" },
  setResSelected: (f: TResultData) => {
    set((state) => ({
      ...state,
      resSelected: f,
    }));
  },
}));

export type TFormattedRes = {
  title: string;
  description: string;
  code: string;
  line: number;
};

type TFormattedResStore = {
  securityRes: TFormattedRes[];
  setSecurityRes: (sr: TFormattedRes[]) => void;
  suggestRes: TFormattedRes[];
  setSuggestRes: (sg: TFormattedRes[]) => void;
};

export const useFormattedResStore = create<TFormattedResStore>((set) => ({
  securityRes: [],
  setSecurityRes: (sr: TFormattedRes[]) => {
    set((state) => ({
      ...state,
      securityRes: [...sr], // 보안 취약점 상태 업데이트
    }));
  },
  suggestRes: [],
  setSuggestRes: (sg: TFormattedRes[]) => {
    set((state) => ({
      ...state,
      suggestRes: [...sg], // 수정 제안 상태 업데이트
    }));
  },
}));

export type TMsg = {
  title: string;
  msg: string;
};

type TErrorMsgStore = {
  errorMsg: TMsg;
  setErrorMsg: (e: TMsg) => void;
};

export const useErrorMsgStore = create<TErrorMsgStore>((set) => ({
  errorMsg: { title: "", msg: "" },
  setErrorMsg: (e: TMsg) => {
    set((state) => ({
      ...state,
      errorMsg: e,
    }));
  },
}));
