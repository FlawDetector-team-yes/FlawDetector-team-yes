import db from "@/firebase/firebaseClient";
import { logout } from "@/server/user.action";
import { getSession } from "@/lib/getSession";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";

function UserProfileBtn({ pathName }: { pathName: string }) {
  // 사용자 정보 삭제(탈퇴)
  const deleteUserInfo = async () => {
    "use server";

    const session = await getSession();
    const email = session?.user?.email;
    const docRef = collection(db, "users");
    const findUserQ = query(docRef, where("email", "==", email));
    const userId = (await getDocs(findUserQ)).docs[0]?.id;

    await deleteDoc(doc(db, "users", userId));
    await logout();
  };

  return (
    <>
      {pathName === "/me" ? (
        <Link href="/me/my-profile">
          <button className="fill-hover out-radius-8px h-[40px] w-[126px] border-[#6100FF] font-normal">
            프로필 정보
          </button>
        </Link>
      ) : (
        <form action={deleteUserInfo}>
          <button
            type="submit"
            className="fill-hover out-radius-8px h-[40px] w-[126px] border-system-warning bg-system-warning/20 font-normal text-system-warning"
          >
            <Link href={"/"}>회원탈퇴</Link>
          </button>
        </form>
      )}
    </>
  );
}
export default UserProfileBtn;
