"use client";
import Image from "next/image";
import pin from "/public/images/pin.png";
import pinActive from "/public/images/pin-active.png";
import { useSession } from "next-auth/react";
import fetchPin from "@/firebase/fetchPin";
import { usePinnedStore } from "@/store/usePinnedStore";

/**
 * @typedef {Object} TPinState
 * @property {number} id - 핀 상태를 추적하는 항목의 ID.
 * @property {boolean} state - 항목이 핀된 상태인지 여부를 나타냅니다.
 */

type TPinState = {
  id: string;
  state: boolean;
};

function Clip({ id }: { id: string }) {
  const { pinnedId, togglePinnedId } = usePinnedStore();
  const { data: session } = useSession();

  /**
   * 핀 상태를 확인하는 함수입니다.
   *
   * @param {string} id - 핀 상태를 확인할 기사 항목의 ID.
   * @returns {boolean} - 해당 ID가 pinnedId 배열에 있으면 true, 없으면 false.
   */
  const isPinned = () => {
    return pinnedId.includes(id); // id가 pinnedId 배열에 포함되어 있으면 true 반환
  };

  const handlePinState = async (id: string, session: any) => {
    togglePinnedId(id); // 핀 상태를 토글
    await fetchPin(id, session); // 핀 상태를 서버와 동기화
  };

  return (
    <button onClick={() => handlePinState(id, session)}>
      {isPinned() ? (
        <Image src={pinActive} alt="pin-active" width={20} height={20} />
      ) : (
        <Image src={pin} alt="pin" width={20} height={20} />
      )}
    </button>
  );
}

export default Clip;
