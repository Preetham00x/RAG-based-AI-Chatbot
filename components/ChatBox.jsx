"use client";
import { useState } from "react";

export default function ChatBox() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  async function send() {
    const res = await fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({ question: msg })
    });

    const data = await res.json();

    setChat(prev => [...prev, { q: msg, a: data.answer }]);
    setMsg("");
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {chat.map((c, i) => (
          <div key={i}>
            <strong>You:</strong> {c.q}
            <br />
            <strong>Bot:</strong> {c.a}
            <hr />
          </div>
        ))}
      </div>

      <input
        value={msg}
        onChange={e => setMsg(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
