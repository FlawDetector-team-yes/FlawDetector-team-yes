import Image from "next/image";
import { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import magnifier from "../../../../public/images/magnifier.png";
import {
  EditorView,
  Decoration,
  ViewPlugin,
  ViewUpdate,
  DecorationSet,
} from "@codemirror/view";
import { RangeSetBuilder, Extension } from "@codemirror/state";
import {
  useFormattedResStore,
  useResSelectedStore,
} from "@/store/useAnalyzeStore";
import { securityResDummyData, suggestResDummyData } from "./dummydata";

function ResCodeViewer() {
  const resSelected = useResSelectedStore((state) => state.resSelected);
  const suggestRes = useFormattedResStore((state) => state.suggestRes);
  const securityRes = useFormattedResStore((state) => state.securityRes);

  // 보안 취약점 검출 코드 라인
  const scLines = securityRes.map((res) => {
    return res.line;
  });

  // eslint 기반 수정 제안 코드 라인
  const sgLines = suggestRes.map((res) => {
    return res.line;
  });

  // 보안 취약점 검출 코드 라인
  const scDummyLines = securityResDummyData.map((res) => {
    return res.line;
  });

  // eslint 기반 수정 제안 코드 라인
  const sgDummyLines = suggestResDummyData.map((res) => {
    return res.line;
  });

  const highLightDummyLine = [...scDummyLines, ...sgDummyLines];
  const highlightLine = [...scLines, ...sgLines];

  /**
   * 특정 라인을 하이라이트하는 플러그인을 생성합니다.
   * @param {number[]} lineNumbers - 하이라이트할 라인 번호 배열
   * @returns {Extension} 하이라이트 플러그인
   */
  const highlightLinePlugin = (lineNumbers: number[]): Extension =>
    ViewPlugin.fromClass(
      class {
        decorations: DecorationSet;

        constructor(view: EditorView) {
          this.decorations = this.createDecorations(view, lineNumbers);
        }

        update(update: ViewUpdate) {
          if (update.docChanged || update.viewportChanged) {
            this.decorations = this.createDecorations(update.view, lineNumbers);
          }
        }

        /**
         * 주어진 라인 번호에 따라 하이라이트 데코레이션을 생성합니다.
         * @param {EditorView} view - CodeMirror의 뷰 인스턴스
         * @param {number[]} lineNumbers - 하이라이트할 라인 번호 배열
         * @returns {DecorationSet} 데코레이션 셋
         */
        createDecorations(
          view: EditorView,
          lineNumbers: number[],
        ): DecorationSet {
          const builder = new RangeSetBuilder<Decoration>();
          for (const { from, to } of view.visibleRanges) {
            for (let pos = from; pos <= to; ) {
              const line = view.state.doc.lineAt(pos);
              if (lineNumbers.includes(line.number)) {
                builder.add(
                  line.from,
                  line.from,
                  Decoration.line({
                    attributes: { style: "background-color: #FFE5E5" },
                  }),
                );
              }
              pos = line.to + 1;
            }
          }
          return builder.finish();
        }
      },
      { decorations: (v) => v.decorations },
    );

  return (
    <>
      {resSelected?.content ? (
        <>
          <CodeMirror
            value={resSelected?.content}
            height="400px"
            id="resCodeViewer"
            extensions={[
              javascript({ jsx: true }),
              highlightLinePlugin(
                highlightLine.length === 0
                  ? [...highLightDummyLine]
                  : [...highlightLine],
              ),
            ]}
            editable={false}
            theme={eclipse}
            onChange={(value) => {
              console.log("value:", value);
            }}
          />
          <style jsx global>{`
            /* CodeMirror 컨테이너 스타일 */
            #resCodeViewer {
              .cm-editor,
              .cm-scroller {
                padding: 0;
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
      ) : (
        <>
          <div className="flex h-[400px] items-center justify-center text-[32px] font-light text-primary-500">
            <div className="flex flex-col items-center justify-center gap-6">
              <Image src={magnifier} alt="Magnifier" width={50} height={50} />
              <span className="font-pretendard text-[32px] font-medium text-primary-500">
                파일을 선택하세요
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default ResCodeViewer;
