import ChatBox from "../components/ChatBox";
import UploadPanel from "../components/UploadPanel";

export default function Home() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>RAG Chatbot</h1>
      <UploadPanel />
      <ChatBox />
    </main>
  );
}
