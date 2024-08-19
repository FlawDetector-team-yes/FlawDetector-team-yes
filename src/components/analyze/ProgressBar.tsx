import React from "react";

type TProgressBarProps = {
  /** 진행 상태를 나타내는 숫자 (0부터 100까지의 값) */
  progress: number;
};

/**
 * ProgressBar 컴포넌트는 진행 상태를 시각적으로 표시하는 프로그레스 바입니다.
 * @param {ProgressBarProps} props - 컴포넌트 속성
 * @param {number} props.progress - 프로그레스 바의 진행 상태 (0~100)
 * @returns {JSX.Element} 프로그레스 바 컴포넌트
 */
function ProgressBar({ progress }: TProgressBarProps) {
  return (
    <div className="h-[14px] w-full rounded-full bg-gray-200">
      <div
        className="flex h-full items-center justify-center rounded-full bg-[#00C308] text-center text-sm font-semibold text-blue-100"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
}
export default ProgressBar;
