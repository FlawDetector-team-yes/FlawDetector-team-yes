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
