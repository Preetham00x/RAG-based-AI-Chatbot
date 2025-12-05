import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { question } = await req.json();

    const result = await client.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: question }]
    });

    return NextResponse.json({
      answer: result.choices[0].message.content
    });
  } catch (err) {
    console.error("ERROR QUERY:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
