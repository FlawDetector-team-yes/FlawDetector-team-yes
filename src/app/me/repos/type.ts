export type TGithubContentLinks = {
  self: string;
  git: string;
  html: string;
};

export type TGithubContent = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  content?: string; // type이 file일 경우 content 프로퍼티 존재
  encoding?: string; // type이 file일 경우 encoding 프로퍼티 존재
  type: "file" | "dir";
  _links: TGithubContentLinks;
};

export type TSelectedFiles = {
  name: string;
  sha: string;
  content: string;
  //progress: number; // 검사 진행도
};

export type TAnalysisResult = TGithubContent & {
  results: {
    code: string;
    coment: string;
  }[];
};
