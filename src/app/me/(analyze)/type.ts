export type TRepositoryFiles = {
  id: string;
  fileName: string;
  code: string;
};

export type TSelectedFiles = TRepositoryFiles & { isCodeAnalyzed?: string };
// isCodeAnalyzed : completed(완료), pending(대기), error(오류)

export type TSelectedFilesProps = {
  selectedFiles: TSelectedFiles[];
  onClick: (file: TSelectedFiles) => void;
};
