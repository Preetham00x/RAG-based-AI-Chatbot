"use client";
import { useState } from "react";

export default function UploadPanel() {
  const [status, setStatus] = useState("");

  async function uploadDoc(e) {
    e.preventDefault();

    const file = e.target.file.files[0];
    const form = new FormData();
    form.append("file", file);

    setStatus("Uploading...");

    await fetch("/api/embed", { method: "POST", body: form });

    setStatus("Uploaded & embedded!");
  }

  return (
    <form onSubmit={uploadDoc} style={{ marginBottom: "20px" }}>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
      <p>{status}</p>
    </form>
  );
}
