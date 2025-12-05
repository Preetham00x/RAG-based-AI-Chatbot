import { ChromaClient } from "chromadb";

export const chroma = new ChromaClient({
  path: process.env.CHROMA_URL
});

export async function getCollection() {
  return await chroma.getOrCreateCollection({
    name: "rag_docs"
  });
}
