import Image from "next/image";
/**
 * @TODO 배경이미지 넣기
 * @TODO2 서비스 이용 약관 등 3가지 주소 바로 넣기
 */
function Footer() {
  return (
    <div className="flex justify-between px-20 pb-14 pt-16">
      <div className="flex flex-col">
        <Image
          src="./images/sfacspace.svg"
          alt="sfacspaceImg"
          width={120}
          height={55}
        />
        <div className="mb-2 mt-9 font-['Inter'] text-xl font-semibold leading-[30px] text-[#3f3f3f]">
          CONTACT
        </div>
        <div className="flex h-20 items-start justify-start gap-10">
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="flex items-start justify-start gap-[26px]">
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696]">
                (주)스팩스페이스
              </p>
              <div className="flex items-start justify-start gap-[11px]">
                <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696]">
                  대표자
                </p>
                <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#3f3f3f]">
                  염민호
                </p>
              </div>
            </div>
            <div className="text-center font-['Inter'] text-base font-medium leading-normal text-[#3f3f3f]">
              서울 강서구 마곡중앙2로 11, 3층 303호
            </div>
            <div className="flex items-start justify-start gap-[23px]">
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696]">
                Email
              </p>
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#3f3f3f]">
                admin@sfacspace.com
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="flex items-start justify-start gap-[7px]">
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696]">
                사업자등록번호
              </p>
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#3f3f3f]">
                450-87-01864
              </p>
            </div>
            <div className="flex items-start justify-start gap-[13px]">
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696]">
                대표전화
              </p>
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#3f3f3f]">
                02-6217-1119
              </p>
            </div>
            <div className="flex items-start justify-start gap-[30px]">
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696]">
                팩스
              </p>
              <p className="text-center font-['Inter'] text-base font-medium leading-normal text-[#3f3f3f]">
                02-6217-1115
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <div className="flex h-[66px] flex-col items-end justify-start gap-3">
          <div className="flex items-start justify-start gap-8">
            <a
              href="https://www.google.com/"
              className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696] underline"
            >
              회사소개
            </a>
            <a
              href="https://www.google.com/"
              className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696] underline"
            >
              서비스이용약관
            </a>
            <a
              href="https://www.google.com/"
              className="text-center font-['Inter'] text-base font-medium leading-normal text-[#969696] underline"
            >
              개인정보처리방침
            </a>
          </div>
          <div className="text-center">
            <p className="font-['Inter'] text-base font-medium leading-normal text-[#3f3f3f]">
              ⒸSpacspace.All right reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
