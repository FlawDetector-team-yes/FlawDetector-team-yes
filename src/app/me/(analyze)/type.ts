export type TFile = {
  id: string;
  fileName: string;
  code: string;
};

export type TSelectedFiles = TFile & { isCodeAnalyzed?: string };
// isCodeAnalyzed : completed(완료), pending(대기), error(오류)

export type TSelectedFilesProps = {
  selectedFiles: TSelectedFiles[];
  onClick: (file: TSelectedFiles) => void;
};

export type TAnalysisResult = TFile & {
  results: {
    code: string;
    coment: string;
  }[];
};
