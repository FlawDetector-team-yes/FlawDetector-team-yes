// app/api/vulnerability/route.ts
import { NextResponse } from "next/server";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import db from "@/firebase/firebaseClient";

export async function GET() {
  const vulnerabilityCollectionRef = collection(db, "vulnerability"); // 'vulnerability' 컬렉션 참조

  const q = query(vulnerabilityCollectionRef, orderBy("subtitle", "desc"));

  try {
    const querySnapshot = await getDocs(q);

    const vulnerabilityData = querySnapshot.docs.map((doc) => ({
      id: doc.id, // 문서의 ID
      ...doc.data(), // 문서의 나머지 데이터
    }));

    return NextResponse.json(vulnerabilityData);
  } catch (error) {
    console.error("Error fetching vulnerability data:", error);
    return NextResponse.error();
  }
}
