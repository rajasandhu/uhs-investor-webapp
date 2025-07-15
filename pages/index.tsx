import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const presetQuestions = [
    "What is the Universal Health Score?",
    "How is UHS monetized?",
    "How does it integrate mental and biometric data?",
    "What’s the competitive advantage of UHS?",
    "Why should investors take this seriously?"
  ];

  const handleAsk = async (presetQuestion?: string) => {
    const question = presetQuestion || input;
    if (!question) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="min-h-screen bg-gray-100 text-black flex flex-col">
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center">UHS Investor Q&A</h1>
      </header>

      <div className="p-4 max-w-2xl w-full mx-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {presetQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleAsk(q)}
              className="bg-white border border-gray-300 px-3 py-2 rounded-full text-sm hover:bg-gray-200"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl p-4 shadow max-h-[60vh] overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap px-4 py-2 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-100 self-end ml-auto"
                  : "bg-gray-200 self-start"
              }`}
            >
              <strong>{msg.role === "user" ? "You" : "UHSgpt"}</strong>: {msg.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="mt-auto w-full bg-white shadow-inner p-4 sticky bottom-0">
        <div className="flex max-w-2xl mx-auto gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="flex-1 border border-gray-300 rounded-xl p-3"
          />
          <button
            onClick={() => handleAsk()}
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            Ask
          </button>
        </div>
      </div>
    </main>
  );
}

