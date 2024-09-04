import { create } from "zustand";

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
  setAnalyzeFiles: (files: TAnalyzeFiles) => void;
};

// Progress Store 생성
export const useAnalyzeFilesStore = create<TAnalyzeFilesStore>((set) => ({
  analyzeFiles: [],
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
  name?: string;
  path?: string;
  result: string; // 결과 저장
};

type TResultDataStore = {
  resultData: TResultData[];
  setResultData: (res: TResultData) => void;
};

// Result Store 생성
export const useResultDataStore = create<TResultDataStore>((set) => ({
  resultData: [],
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
