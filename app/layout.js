export const metadata = {
  title: "RAG Chatbot",
  description: "Next.js RAG Chatbot using Chroma + Groq"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
