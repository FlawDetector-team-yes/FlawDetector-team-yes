import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;

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

    // console.log(content);

    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({
        user_message: `${content}\n\nquestion: Please translate the security vulnerability analysis result of the above code into Korean and respond only in Korean according to the requested format. Save the object arrangement below for the security vulnerability analysis result of each code. securityRes=[{ title: string; // code vulnerability, description: string; // code vulnerability description ,code: string; // code vulnerability code, line: number; // code vulnerability code line number }] Once the security vulnerability analysis is complete, please translate the ESLint-based calibration proposal and respond only in Korean according to the requested format. Save the calibration proposal for each code in the object array below. suggestRes=[{ title: string; // ESLint calibration proposal, description: string; // ESLint calibration description, code: string; //ESLint calibration code, line: number; // ESLint calibration code line number }] Only respond to the securityRes array and the suggestRes array.`,
        temperature: 0.6,
        top_p: 0.6,
      }),
    };
    const result = await fetch(
      `http://43.203.238.76:8000/generate`,
      option,
    ).then((res) => res.text());
    console.log(result);

    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
  }
}
