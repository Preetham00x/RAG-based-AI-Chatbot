"use client";
import { useState } from "react";

export default function ChatBox() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!msg.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"   // IMPORTANT!
        },
        body: JSON.stringify({ question: msg })
      });

      const data = await res.json();

      setChat(prev => [
        ...prev,
        { q: msg, a: data.answer || "No response" }
      ]);
      setMsg("");
    } catch (err) {
      console.error(err);
      alert("Error talking to chatbot");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat</h2>

      {/* Chat history */}
      <div style={{ marginBottom: "20px" }}>
        {chat.map((c, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <strong>You:</strong> {c.q}
            <br />
            <strong>Bot:</strong> {c.a}
            <hr />
          </div>
        ))}
      </div>

      {/* Input box */}
      <input
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Ask something..."
        style={{
          padding: "8px",
          width: "250px",
          marginRight: "10px"
        }}
      />

      <button onClick={send} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
