import { TMsg } from "@/store/useAnalyzeStore";

// 데이터 파싱 오류 시 출력
export const ParsingErrorMsg: TMsg = {
  title: "데이터를 처리할 수 없습니다.",
  msg: "데이터를 가져오는 과정에서 오류가 발생했습니다. 검사를 다시 진행해주세요.",
};

// 제한시간 60초 경과 시 출력
export const MaxErrorMsg: TMsg = {
  title: "시간이 초과되었습니다.",
  msg: "요청 연결 시간이 초과되었습니다. 검사를 다시 진행해주세요.",
};

// 검출된 결과가 ""(빈 값)일 경우 출력
export const NoDataMsg: TMsg = {
  title: "검출된 취약점이 없습니다.",
  msg: "코드에 검출된 취약점이 없습니다.",
};
