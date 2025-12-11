📚 RAG-Based AI Chatbot (Next.js + ChromaDB + Groq LLM)

A fully functional Retrieval-Augmented Generation (RAG) chatbot built using:

Next.js 14 (App Router)

Groq LLaMA-3 API for LLM responses

ChromaDB for vector storage

Custom document upload + embedding pipeline

This chatbot allows you to upload documents, automatically embed them into vectors, store them in ChromaDB, and then ask questions that the bot answers using retrieved context.

🚀 Features
✅ Upload Documents

Upload .txt, .md, .pdf (optional), code files, and more.

✅ Automatic Vector Embeddings

Uploaded docs are embedded using a Groq-based embedding prompt.

✅ ChromaDB Vector Storage

Stores all embeddings + documents in a persistent local vector DB.

✅ Intelligent Querying

User questions → Chroma retrieves similar chunks → Sent to LLaMA-3 for a grounded answer.

✅ Chat Interface

Simple React component for chat exchange.

✅ API Routes

/api/embed → Upload & embed documents

/api/query → Query using RAG

/api/chat → Normal LLM chat

🧩 Project Structure
next-rag-chatbot/
├─ app/
│  ├─ layout.js
│  ├─ page.js
│  └─ api/
│     ├─ embed/route.js
│     ├─ query/route.js
│     └─ chat/route.js
├─ components/
│  ├─ ChatBox.jsx
│  └─ UploadPanel.jsx
├─ lib/
│  ├─ chromaClient.js
│  └─ groqClient.js
├─ public/
├─ package.json
├─ README.md
└─ .env.local

🛠️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/yourrepo.git
cd next-rag-chatbot

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a file:

.env.local


Add:



4️⃣ Start ChromaDB

If using the built-in server:

pip install chromadb
chroma run --path ./chroma


Or using Docker:

docker run -p 8000:8000 chromadb/chroma:latest

5️⃣ Run the Next.js App
npm run dev


Runs on:

http://localhost:3000

💡 How It Works
🟦 1. Document Upload → Embedding

/api/embed route:

receives uploaded file

extracts text

generates an embedding via Groq LLM

stores vector + original text in ChromaDB

🟩 2. Querying

/api/query route:

user asks a question

Chroma finds nearest documents

Combined into a context block

Passed to Groq LLaMA-3 for grounded response

🟧 3. Chat (No RAG)

/api/chat route:

pure LLM chat

no retrieval

📸 Screenshots (optional)

(Add after you take screenshots)

📌 Example Query Flow

Input Question:

"Explain the architecture described in the uploaded document."

System Flow:

Search Chroma for similar chunks

Retrieve top 3 relevant pieces

Build a prompt:

Use ONLY the following context to answer:
<context...>

Question: ...


Groq produces the final answer

🧪 Testing API Routes
Test upload route
curl -X POST -F "file=@notes.txt" http://localhost:3000/api/embed

Test query route
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"question": "What did the document talk about?"}'

📂 To Add PDF Support

Ask:

“Add PDF text extraction”

And I will generate the updated code.

🧭 Roadmap

 Better chat UI

 Source-citation in answers

 Streaming responses

 PDF + DOCX text parsing

 Authentication

🤝 Contributing

Pull requests are welcome!
Open an issue if you find bugs or want improvements.

📜 License

MIT License — free to use, share, and modify.
