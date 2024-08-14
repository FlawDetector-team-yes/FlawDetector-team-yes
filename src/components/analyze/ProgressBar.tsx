export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <>
      <div className="h-[14px] w-full gap-6 rounded-full bg-gray-200">
        <div
          className="flex h-[14px] items-center justify-center rounded-full bg-[#00C308] p-0.5 text-center text-sm font-semibold leading-none text-blue-100"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </>
  );
}
