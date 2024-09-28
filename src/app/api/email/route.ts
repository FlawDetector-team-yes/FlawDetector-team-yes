import { sendEmail } from "@/hook/emailer";
import { NextResponse } from "next/server";

// POST 메서드 정의
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    // 이메일 전송
    await sendEmail(body);

    // 성공 응답
    return NextResponse.json(
      { message: "메일을 성공적으로 보냈음" },
      { status: 200 },
    );
  } catch (error) {
    // 에러를 구체적으로 출력하여 원인을 파악
    console.error("이메일 전송 오류:", error);
    return NextResponse.json(
      { message: "메일 전송에 실패함", error },
      { status: 500 },
    );
  }
}
