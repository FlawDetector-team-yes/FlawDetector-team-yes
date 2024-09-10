import useModal from "@/store/modalState";
import bugImg from "../../../../public/images/bug.svg";
import checkImg from "../../../../public/images/circle-purple-success.svg";
import downloadImg from "../../../../public/images/download.png";
import cancelImg from "../../../../public/images/circle-x-mark.png";
import Image, { StaticImageData } from "next/image";
import ModalFileList from "./ModalFileList";
import {
  TAnalyzeFileResult,
  useAnalyzeFileResultStore,
  useAnalyzeFilesStore,
  useReposStateStore,
  useResultDataStore,
  useSaveTimeStore,
  useStepStore,
  useWorkerStore,
} from "@/store/useAnalyzeStore";
import useSelectedFilesStore from "@/store/useSelectedFilesStore";
import { useParams } from "next/navigation";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "@/firebase/firebaseClient";
import { Session } from "next-auth";
import { format } from "date-fns";

type TStepInfo = {
  headerText: string;
  nextBtnText: string;
  mainText?: string; // analyze와 finish 단계에서만 사용되므로 선택적(optional) 속성으로 지정
  img: StaticImageData; // 이미지 타입
};

// 3단계 UI 진행 변화 : 선택(select) > 분석(analyze) > 분석 완료(finish)
const stepInfo: Record<string, TStepInfo> = {
  select: {
    headerText: "선택한 파일을 검사하시겠습니까?",
    mainText: "",
    nextBtnText: "검사하기",
    img: bugImg,
  },
  analyze: {
    headerText: "소스 코드 취약점을 분석 중입니다.",
    mainText:
      "모든 코드 분석이 완료된 후에만 검사 이력을 저장할 수 있습니다. 잠시만 기다려 주세요.",
    nextBtnText: "중단하기",
    img: bugImg,
  },
  cancel: {
    headerText: "소스 코드 검사가 중단 되었습니다.",
    mainText: "코드 분석이 완료된 검사 이력만 저장됩니다.",
    nextBtnText: "저장하기",
    img: cancelImg,
  },
  finish: {
    headerText: "소스코드 취약점 분석이 완료되었습니다",
    mainText:
      "AI 플로디텍터가 모든 파일의 분석을 끝냈습니다. 분석한 결과를 저장하시겠습니까?",
    nextBtnText: "저장하기",
    img: checkImg,
  },
  save: {
    headerText: "분석 결과 저장이 완료되었습니다",
    mainText:
      "모든 파일의 분석 결과 저장을 끝냈습니다. 검사를 끝내시려면 확인을 눌러주세요.",
    nextBtnText: "확인",
    img: downloadImg,
  },
};

/**
 * 분석 모달 컴포넌트
 * @returns {JSX.Element} 분석 모달 UI를 반환
 */
export const AnalysisModal: React.FC<any> = ({
  session,
}: {
  session: Session | undefined;
}) => {
  const repo = useParams<{ id: string }>();
  const closeModal = useModal((state) => state.setIsClose); // 모달 닫기 함수
  const currentStep = useStepStore((state) => state.currentStep); // 현재 단계 상태
  const setCurrentStep = useStepStore((state) => state.setCurrentStep); // 현재 단계 상태 업데이트
  const selectedFiles = useSelectedFilesStore((state) => state.selectedFiles); // 선택된 파일들
  const setAnalyzeFiles = useAnalyzeFilesStore(
    (state) => state.setAnalyzeFiles,
  ); // 검사 중인 파일 업데이트
  const resultData = useResultDataStore((state) => state.resultData); // 검사 결과
  const setResultData = useResultDataStore((state) => state.setResultData); // 검사 결과 업데이트
  // const [workers, setWorkers] = useState<Worker[]>([]); // 워커 상태관리를 위한 배열
  const addWorker = useWorkerStore((state) => state.addWorker);
  const clearWorkers = useWorkerStore((state) => state.clearWorkers);
  const analyzeFileResult = useAnalyzeFileResultStore(
    (state) => state.analyzeFileResult,
  );
  const setAnalyzeFileResult = useAnalyzeFileResultStore(
    (state) => state.setAnalyzeFileResult,
  );
  const selectedAllFile = useSelectedFilesStore(
    (state) => state.selectedAllFile,
  );
  const saveTime = useSaveTimeStore((state) => state.saveTime);
  const setSaveTime = useSaveTimeStore((state) => state.setSaveTime);
  const reposState = useReposStateStore((state) => state.reposState);
  const setReposState = useReposStateStore((state) => state.setReposState);

  /**
   * 검사하기 누를 경우 실행되는 로직
   * web worker가 실행됨.
   */
  const getAnalyzeFiles = async () => {
    // 검사하기 누를 경우
    const workerPromises = selectedFiles.map((file) => {
      return new Promise<void>((resolve, reject) => {
        const worker = new Worker(
          new URL(`../../../worker/analyzeWorker.ts`, import.meta.url),
        );

        addWorker(worker); // 워커 스토어에 워커 추가

        worker.postMessage({
          fileId: file.sha,
          name: file.name,
          content: file.content,
          apiUrl: `/api/analyze/llm`,
          currState: currentStep,
        });

        worker.onmessage = (event) => {
          const { fileId, name, content, percent, result, status, type } =
            event.data;

          if (type === "progress") {
            setCurrentStep("analyze");
            setReposState({ repoId: "", repoName: repo.id, state: "analyze" });
            setAnalyzeFiles({ fileId, progressValue: percent, state: status });
          } else if (type === "completed") {
            setResultData({ sha: fileId, name, content, result });
            worker.terminate();
            resolve(); // 워커 작업 완료 시 resolve 호출
          } else if (type === "error") {
            console.error(
              `Error processing file ${fileId}: ${event.data.message}`,
            );
            worker.terminate();
            reject(event.data.message); // 에러 발생 시 reject 호출
          }
        };
      });
    });

    try {
      await Promise.all(workerPromises); // 모든 워커 작업이 완료될 때까지 대기
      setCurrentStep("finish"); // 모든 작업이 끝나면 finish로 변경
      // 특정 형식으로 날짜 data 문자열 format
      const today = format(new Date(), "yyyy-MM-dd HH:mm");
      // base64 encoding
      const encodingSaveTime = btoa(today);

      setSaveTime(encodingSaveTime);

      setReposState({
        repoId: encodingSaveTime,
        repoName: repo.id,
        state: "finish",
      });

      setAnalyzeFileResult({
        repoId: encodingSaveTime,
        repoName: repo.id,
        data: [...resultData],
      });
    } catch (error) {
      console.error("One or more workers failed:", error);
    }
  };

  /**
   * 검사 중단 함수
   */
  const handleCancel = () => {
    clearWorkers(); // 모든 워커 종료

    // analyzeFiles 초기화
    selectedFiles.forEach((file) => {
      setAnalyzeFiles({
        fileId: file.sha,
        progressValue: 0,
        state: "canceled", // 상태를 "canceled"로 설정
      });
    });

    setCurrentStep("cancel"); // 상태를 cancle로 변경하여 중단 시킴
  };

  /**
   * 현재 단계에 따라 모달을 닫거나 분석을 중단하는 함수
   * 왼쪽 버튼 클릭 핸들러
   */
  const handleCloseModal = () => {
    if (currentStep === "cancel") {
      setCurrentStep("select"); // step 초기화 시켜줌
    } else {
      closeModal?.();
    }
  };

  /**
   * 다음 단계로 이동하거나 분석을 완료하는 함수
   * 오른쪽 버튼 클릭 핸들러
   */
  const handleNextStep = () => {
    if (currentStep === "select") {
      // worker 실행
      getAnalyzeFiles();
    } else if (currentStep === "analyze") {
      // 검사 중단
      handleCancel();
    } else if (currentStep === "finish") {
      // 분석 완료 후 모달 닫기 및 저장 처리
      // TODO: 코드 검사 결과 페이지로 이동 처리

      // 특정 형식으로 날짜 data 문자열 format
      // const today = format(new Date(), "yyyy-MM-dd HH:mm");
      // base64 encoding
      // const encodingSaveTime = btoa(today);

      saveResult();
    } else if (currentStep === "save") {
      // 저장 모달 안에서 "확인" 버튼 눌렀을 때
      selectedAllFile([]);
      // analyzeFiles 초기화
      selectedFiles.forEach((file) => {
        setAnalyzeFiles({
          fileId: file.sha,
          progressValue: 0,
          state: "canceled", // 상태를 "canceled"로 설정
        });
      });
      closeModal?.();
    } else {
      closeModal?.();
    }
  };

  const saveResult = async () => {
    // 결과 data
    const analyzeRes = {
      repoId: saveTime,
      repoName: repo.id,
      data: [...resultData],
    };

    try {
      const allUserRef = collection(db, "users");
      const currUser = query(
        allUserRef,
        where("email", "==", session?.user?.email),
      );

      const userDocs = await getDocs(currUser);

      if (userDocs.empty) {
        console.error("사용자를 찾을 수 없습니다.");
        return;
      }

      const userDoc = userDocs.docs[0];
      const userRef = userDoc.ref;

      const userData = userDoc.data();

      // analyzeFileResult 필드가 있는지 확인하고 필드가 없으면 빈 배열로 설정
      const analyzeFileResult = userData?.analyzeFileResult || [];

      // 이미 존재하는 repo인지 확인하고 그 index를 가져옴
      const existRepo = analyzeFileResult.findIndex(
        (res: TAnalyzeFileResult) => res.repoName === analyzeRes.repoName,
      );

      if (existRepo > -1) {
        // 이미 존재한다면 해당 위치에 있는 결과를 바꿔줌
        analyzeFileResult[existRepo] = analyzeRes;
      } else {
        // 존재하지 않는다면 결과를 push로 넣어줌.
        analyzeFileResult.push(analyzeRes);
      }
      // currentStep 변경
      setCurrentStep("save");

      // 값을 업데이트 시켜줌
      await updateDoc(userRef, { analyzeFileResult });
      console.log("분석 결과가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("분석 결과를 저장하는 중 오류가 발생했습니다: ", error);
    }
  };

  // console.log(saveTime);
  // console.log(currentStep);
  // console.log(reposState);
  // console.log(analyzeFileResult);

  return (
    <div
      className={`${
        currentStep !== "select" ? "h-[601px]" : "h-[550px]"
      } flex h-[550px] w-[686px] flex-col items-center gap-8 rounded-2xl bg-white p-12`}
    >
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center gap-5">
        <Image
          className={`${currentStep === "analyze" && "animate-[spin_3s_linear_infinite]"}`}
          src={stepInfo[currentStep].img}
          width={50}
          height={50}
          alt="상태 아이콘"
        />
        <p className="flex flex-col items-center gap-2 text-2xl font-semibold">
          {stepInfo[currentStep].headerText}
          {stepInfo[currentStep].mainText && (
            <span className="text-[15px] font-medium text-[#747474]">
              {stepInfo[currentStep].mainText}
            </span>
          )}
        </p>
      </div>

      {/* 파일 리스트 섹션 */}
      <ModalFileList />

      {/* 버튼 섹션 */}
      <div className="flex h-[48px] gap-3 text-xl font-medium">
        <button
          className="w-[200px] rounded-lg bg-[#F1F1F1] font-semibold text-[#C3C3C3] hover:bg-[#e8e8e8]"
          onClick={handleCloseModal}
        >
          닫기
        </button>
        <button
          className={`${
            currentStep === "analyze"
              ? "bg-system-warning text-white"
              : currentStep === "cancel"
                ? "bg-[#F1F1F1] text-[#C3C3C3]"
                : "border-[2px] border-[#6100FF] bg-[#6100FF] text-white hover:bg-[#5300DA]"
          } w-[200px] rounded-lg font-semibold`}
          onClick={handleNextStep}
          disabled={currentStep === "cancel"} // TODO : 분석 중일 때 버튼 비활성화
        >
          {stepInfo[currentStep].nextBtnText}
        </button>
      </div>
    </div>
  );
};
