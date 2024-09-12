import CodeMirror from "@uiw/react-codemirror";
import { useAnalyzeFileResultStore } from "@/store/useAnalyzeStore";

function ModifiedCode({ code }: { code: string }) {
  // const analyzeFileResult = useAnalyzeFileResultStore(
  //   (state) => state.analyzeFileResult,
  // );
  // const selectedFiles = useSelectedFilesStore((state) => state.selectedFiles);
  const fileCode =
    code || "";

  return (
    <>
      <CodeMirror
        value={fileCode}
        id="modifiedCode"
        maxHeight="250px"
        theme="dark"
      />
      <style jsx global>{`
        /* CodeMirror 컨테이너 스타일 */

        #modifiedCode {
          .cm-editor,
          .cm-scroller {
            padding: 5px;
            border-radius: 10px;
          }
        }

        .cm-line {
          font-size: 17px; // 폰트 크기를 조절합니다
          margin-left: 10px;
        }
        .cm-content {
          line-height: 25px; // 코드 줄 간격 설정합니다
          font-family: "Pretendard"; // 코드 폰트를 설정합니다*/
        }
        .cm-gutters {
          font-size: 15px; /* 왼쪽 코드 라인(숫자)의 폰트 크기를 설정합니다*/
        }
      `}</style>
    </>
  );
}
export default ModifiedCode;
