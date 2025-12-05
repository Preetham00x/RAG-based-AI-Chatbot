import { NextResponse } from "next/server";
import { getCollection } from "../../../lib/chromaClient.js";
import { askGroq } from "../../../lib/groqClient.js";

export async function POST(req) {
  const { question } = await req.json();

  const col = await getCollection();
  const results = await col.query({
    nResults: 3,
    queryTexts: [question]
  });

  const context = results.documents[0].join("\n\n");

  const answer = await askGroq(
    `Use ONLY the following context to answer:\n\n${context}\n\nQuestion: ${question}`
  );

  return NextResponse.json({ answer });
}
