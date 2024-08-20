import Sort from "./Sort";

export default function LibrarySort() {
  return (
    <>
      <div className="mt-14 flex w-full justify-between">
        <div>
          <h1 className="text-[32px] font-medium">Library</h1>
        </div>
        <div className="flex gap-4">
          {/* types */}
          <Sort title="type" />
          <Sort title="sort" />
          {/* sort */}
          {/* 
          <div className="flex h-[44px] items-center gap-1 rounded-lg border border-solid border-[#969696] p-[10px]">
            <span>sort</span>
            <div>
              <Image src={triangleDown} alt="아래화살표" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
