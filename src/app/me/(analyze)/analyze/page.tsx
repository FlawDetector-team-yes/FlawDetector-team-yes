import Image from "next/image";
import leftVioletArrow from "../../../../../public/images/left-violet-arrow.png";
import AnalysisWrapper from "@/components/analyze/AnalysisWrapper";

async function AnalyzePage() {
  return (
    <>
      <div className="container mx-auto flex min-w-[1760px] flex-col gap-[45px]">
        <section className="flex h-[79px] w-full items-center gap-6 rounded-full border-4 border-primary-500 p-5 text-primary-500">
          <Image
            src={leftVioletArrow}
            alt="Left Violet Arrow"
            width={36}
            height={36}
          />
          <p className="flex items-center text-[38px] font-medium">
            sfacweb - 1
          </p>
        </section>
        <AnalysisWrapper />
      </div>
    </>
  );
}
export default AnalyzePage;
