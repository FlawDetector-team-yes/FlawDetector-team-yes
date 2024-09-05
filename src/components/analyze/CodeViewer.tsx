"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import magnifier from "../../../public/images/magnifier.png";
import {
  EditorView,
  Decoration,
  ViewPlugin,
  ViewUpdate,
  DecorationSet,
} from "@codemirror/view";
import { RangeSetBuilder, Extension } from "@codemirror/state";
import useSelectedFilesStore from "@/store/useSelectedFilesStore";
import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import Image from "next/image";

const eclipseTheme = createTheme({
  theme: "light",
  settings: {
    background: "#ffffff", // 배경색
    foreground: "#000000", // 기본 텍스트 색상
    caret: "#0e7c61", // 커서 색상
    selection: "#d7d4f0", // 선택 영역 색상
    selectionMatch: "#d7d4f0", // 선택된 단어 색상
    gutterBackground: "#f7f7f7", // 라인 번호 배경
    gutterForeground: "#333333", // 라인 번호 색상
    gutterBorder: "#dddddd", // 라인 번호 테두리
    lineHighlight: "#f3f3f3", // 현재 라인 하이라이트 배경
  },
  styles: [
    { tag: t.comment, color: "#3f7f5f", fontStyle: "italic" }, // 주석
    { tag: t.definition(t.typeName), color: "#d35400" }, // 타입 정의
    { tag: t.typeName, color: "#d35400" }, // 타입 이름
    { tag: t.tagName, color: "#7f0055" }, // 태그 이름
    { tag: t.variableName, color: "#0000ff" }, // 변수 이름
    { tag: t.string, color: "#2a00ff" }, // 문자열
    { tag: t.number, color: "#164" }, // 숫자
    { tag: t.keyword, color: "#7f0055", fontWeight: "bold" }, // 키워드
    { tag: t.function(t.variableName), color: "#795e26" }, // 함수명
    { tag: t.operator, color: "#000000" }, // 연산자
  ],
});

/**
 * CodeViewer 컴포넌트는 선택된 파일의 코드를 CodeMirror를 사용하여 화면에 표시하는 역할을 합니다.
 * 선택된 파일이 없을 경우, 파일을 선택하라는 메시지를 표시합니다.
 */
export default function CodeViewer() {
  const selectedFiles = useSelectedFilesStore((state) => state.selectedFiles);
  const fileCode = selectedFiles[selectedFiles.length - 1]?.content || "";
  const testCode = fileCode || "";
  const highlightLine = [5, 10, 12, 13];
  // const currentCode = "" // 현재 선택한 코드, 수정 예정

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
      {testCode ? (
        <>
          <CodeMirror
            value={testCode}
            minHeight="400px"
            //style={{ fontSize: "20px" }}
            extensions={[
              javascript({ jsx: true }),
              highlightLinePlugin([...highlightLine]),
            ]}
            theme={eclipseTheme}
            onChange={(value) => {
              console.log("value:", value);
            }}
          />
          <style jsx global>{`
            /* CodeMirror 컨테이너 스타일 */
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
          <div className="flex h-full items-center justify-center text-[32px] font-light text-primary-500">
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
