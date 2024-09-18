type TLang = {
  [key: string]: string;
};

const filenameFormat = (lang: string) => {
  const langlist: TLang[] = [
    { js: "javascript" },
    { jsx: "javascript" },
    { ts: "typescript" },
    { tsx: "typescript" },
    { py: "python" },
    { pyo: "python" },
    { pyc: "python" },
    { pl: "perl" },
    { sh: "shell" },
    { m: "object-c" },
    { mm: "object-c++" },
    { cc: "c++" },
    { cpp: "c++" },
    { cxx: "c++" },
    { jsp: "java" },
    { class: "java" },
    { cs: "c#" },
    { rb: "ruby" },
  ];

  // 파일 확장자명 리스트 key값과 lang이 매칭되면 가져오기
  for (const item of langlist) {
    if (item[lang]) {
      return item[lang];
    }
  }
  return lang; // 매칭되는 확장자가 없다면 그대로 내보내주기
};

// 파일 확장자명으로 사용된 lang 가져오가
export const getFileLanguage = (filename: string) => {
  let fileLength = filename.length;
  const dot = filename.lastIndexOf(".");
  const extension = filename.substring(dot + 1, fileLength);
  return filenameFormat(extension);
};
