import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";


export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = formidable({});
  const [fields, files] = await form.parse(req);

  const file = files.file?.[0];
  const buffer = fs.readFileSync(file.filepath);



  const collection = await client.getOrCreateCollection({
    name: "docs",
  });

  await collection.add({
    ids: ["doc1"],
    documents: [buffer.toString()],
  });

  return NextResponse.json({ success: true });
}
