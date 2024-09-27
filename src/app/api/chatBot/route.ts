import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);
  try {
    const auth_url = "http://3.34.255.163:8000/auth/token";
    const formData = new URLSearchParams();
    formData.append("username", `${process.env.NEXT_PUBLIC_USERNAME}`);
    formData.append("password", `${process.env.NEXT_PUBLIC_PASSWORD}`);
    const tokenResponse = await fetch(auth_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
    const token = await tokenResponse.json();
    console.log("Token:", token);
    const resultRequest = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_message: `${body}`,
        temperature: 0.1,
        top_p: 0.1,
      }),
    };
    const result = await fetch(
      `http://3.34.255.163:8000/generate`,
      resultRequest,
    ).then((res) => res.text());
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
}
