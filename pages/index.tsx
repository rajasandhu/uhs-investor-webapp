import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

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

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-4">UHS Investor Q&A</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {presetQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleAsk(q)}
            className="bg-gray-100 hover:bg-gray-200 p-4 rounded-2xl shadow transition text-left"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question here..."
          className="w-full border p-3 rounded-xl"
        />
        <button
          onClick={() => handleAsk()}
          className="mt-2 bg-black text-white px-4 py-2 rounded-xl"
        >
          Ask
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl ${msg.role === "user" ? "bg-blue-100" : "bg-green-100"}`}
          >
            <strong>{msg.role === "user" ? "You" : "UHSgpt"}:</strong> {msg.content}
          </div>
        ))}
      </div>
    </main>
  );
}

