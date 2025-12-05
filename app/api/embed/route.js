import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import { getCollection } from "../../../lib/chromaClient.js";
import { askGroq } from "../../../lib/groqClient.js";

export const runtime = "nodejs";

export async function POST(req) {
  const form = formidable({ multiples: false });

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const file = files.file;
  const text = fs.readFileSync(file.filepath, "utf8");

  // embed using LLM
  const embeddingPrompt = `Convert the following text into a 1536-d embedding vector:\n${text}`;
  const embedRaw = await askGroq(embeddingPrompt);

  const vector = embedRaw.split(",").map(Number);

  const col = await getCollection();
  await col.add({
    ids: [Date.now().toString()],
    embeddings: [vector],
    documents: [text]
  });

  return NextResponse.json({ ok: true });
}
