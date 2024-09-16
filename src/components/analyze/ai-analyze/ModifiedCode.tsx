import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function ModifiedCode({ code }: { code: string }) {
  const getCode = code.split("\\").join("\n");
  const fileCode = getCode || "";

  return (
    <>
      <CodeMirror
        value={fileCode}
        id="modifiedCode"
        maxHeight="250px"
        extensions={[javascript({ jsx: true })]}
        theme="dark"
        editable={false}
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
