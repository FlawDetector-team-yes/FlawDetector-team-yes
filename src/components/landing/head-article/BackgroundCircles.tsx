import React from "react";

/**
 * @description 좌우로 긴 타원이 퍼져나가는 애니메이션을 보여주는 컴포넌트
 * 12개의 타원이 서로 다른 시간에 퍼져나갑니다.
 *
 * @returns {JSX.Element} 퍼져나가는 타원 애니메이션을 포함하는 JSX 요소
 */
function BackgroundCircles() {
  const ellipses = Array.from({ length: 5 });
  return (
    <>
      {/* 12개의 타원 */}
      {ellipses.map((_, index) => (
        <div
          key={index}
          className={`top: 50%, left: 50% absolute -z-10 h-[100px] w-[330px] animate-ripple rounded-[50%_50%/50%_50%] border border-[#F2EBFF] opacity-0`}
          style={{ animationDelay: `${index * 0.5}s` }}
        />
      ))}
    </>
  );
}

export default BackgroundCircles;
