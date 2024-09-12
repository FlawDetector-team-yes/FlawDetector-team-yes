/**
 * Git 레포지토리 목록 로딩 시 표시되는 로딩 컴포넌트
 * 이 컴포넌트는 레포지토리 목록이 로드될 때까지 12개의 placeholder를 화면에 보여줌.
 * 각 placeholder는 애니메이션을 통해 깜박이는 효과(animate-pulse)를 줌으로써 로딩 중임을 시각적으로 표현함.
 * @returns {JSX.Element} 로딩 상태의 레포지토리 목록
 */
export default function GitRepoListLoading() {
  return (
    <>
      {Array(12)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex h-[225px] w-[310px] animate-pulse flex-col justify-between rounded-3xl border border-solid border-[#cecece] p-[20px]"
          >
            <div className="flex h-[100px] w-[270px] flex-col gap-2 rounded-xl bg-gray-400"></div>
            <div className="flex items-end justify-between">
              <button
                className={`flex h-[45px] w-[146px] items-center justify-evenly rounded-xl bg-gray-400`}
              ></button>
            </div>
          </div>
        ))}
    </>
  );
}
