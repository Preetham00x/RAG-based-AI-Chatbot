import { NextResponse } from "next/server";
import { askGroq } from "../../../lib/groqClient.js";

export async function POST(req) {
  const { message } = await req.json();
  const reply = await askGroq(message);

  return NextResponse.json({ reply });
}
