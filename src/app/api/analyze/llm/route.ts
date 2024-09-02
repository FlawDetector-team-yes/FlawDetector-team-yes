import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // token 구하기
    const formdata = new FormData();
    formdata.append("username", `${process.env.NEXT_PUBLIC_USERNAME}`);
    formdata.append("password", `${process.env.NEXT_PUBLIC_PASSWORD}`);

    const tokenOption = {
      method: "POST",
      headers: {
        "Cache-Control": "no-store",
      },
      body: formdata,
    };
    const token = await fetch(
      `http://43.203.238.76:8000/auth/token`,
      tokenOption,
    ).then((res) => res.json());
  } catch (e) {
    console.log(e);
  }
}
