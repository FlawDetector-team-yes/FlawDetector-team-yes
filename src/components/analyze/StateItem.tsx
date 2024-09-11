import Image, { StaticImageData } from "next/image";

/**
 * 통계 항목을 표시하는 컴포넌트입니다.
 *
 * @param {string} src - 이미지 소스 URL.
 * @param {string} alt - 이미지 대체 텍스트.
 * @param {number} count - 표시할 카운트 숫자.
 * @returns {JSX.Element} - 렌더링된 통계 항목.
 */
export default function StateItem({
  src,
  alt,
  count,
}: {
  src: StaticImageData;
  alt: string;
  count: number;
}) {
  return (
    <>
      <div className="flex h-fit w-full items-center justify-start gap-3 text-xl">
        <Image src={src} alt={alt} width={20} height={20} />
        <p className="flex w-full justify-between">
          <span>{alt}</span>
          <span>{alt === "문제 없음" ? "-" : count}</span>
        </p>
      </div>
    </>
  );
}
