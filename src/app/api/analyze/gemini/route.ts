import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    );

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    // The Gemini 1.5 models are versatile and work with most use cases
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig,
      safetySettings: safetySettings,
    });

    const prompt = `${content}\n\nquestion: Please analyze the security vulnerabilities and respond in Korean. Format the response as follows:\n'securityRes=[{ title: \"string\"; // Title of the code vulnerability, description: \"string\"; // Detailed description of the vulnerability, code: \"string\"; // Actual code snippet that is vulnerable, line: number; // Line number of the code in the source file }]' Also, provide ESLint-based suggestions for improvements. Format these suggestions as follows:\n'suggestRes=[{ title: \"string\"; // Title of the ESLint suggestion, description: \"string\"; // Description of why this change is recommended, code: \"string\"; // Suggested code change, line: number; // Line number where the change should be made }]' Make sure to exclude any code blocks or special formatting characters such as backticks. Provide all responses in plain text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    return NextResponse.json(text);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
