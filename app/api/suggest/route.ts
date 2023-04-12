import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest, res: NextResponse) {
  const { prompt } = await req.json();

  console.log(prompt);

  return NextResponse.json({
    suggestions: ["Hello world", prompt],
  });
}
