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
    "Why should investors take this seriously?",
    "How does UHS enable insurance innovation?",
    "What industries can integrate with UHS?",
    "How secure is user health data in UHS?",
    "Is UHS patent-protected?"
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
    <div className="flex flex-col h-screen bg-black text-gray-500">
      <header className="p-6 bg-black">
        <img src="/logo.svg" alt="UHS Logo" className="h-10 mx-auto" />
      </header>

      <main className="flex-1 overflow-y-auto p-6 max-w-3xl w-full mx-auto">
        {messages.length === 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm mb-12">
              {presetQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleAsk(q)}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg text-gray-400 transition"
                >
                  {q}
                </button>
              ))}
            </div>
            <p className="text-gray-600 text-xs text-center">
              Click a prompt above or ask your own question below.
            </p>
          </>
        ) : (
          <div className="w-full bg-black rounded-lg p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`bg-gray-800/30 whitespace-pre-wrap px-4 py-3 rounded-lg max-w-[80%] ${
                  msg.role === "user" ? "self-end ml-auto" : "self-start"
                }`}
              >
                <strong className="block mb-1 text-xs uppercase tracking-wide text-gray-600">
                  {msg.role === "user" ? "You" : "SentientGPT"}
                </strong>
                <span className="text-gray-500">{msg.content}</span>
              </div>
            ))}
            <div ref={bottomRef} />
            <div className="hidden from-[#141414] to-[#292929] bg-gray-800/30"></div>
          </div>
        )}
      </main>

      <footer className="p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="flex-1 bg-black text-gray-500 border border-gray-700 rounded-lg p-3 placeholder-gray-600"
          />
          <button
            onClick={() => handleAsk()}
            className="bg-gradient-to-br from-[#141414] to-[#292929] hover:opacity-90 text-white px-4 py-2 rounded-lg"
          >
            Ask
          </button>
        </div>
        <p className="text-center text-xs text-gray-600 mt-2">
          © Sentient Notion Inc. 2025. A Raja Sandhu company. The Universal Health Score is a patent-pending application.
        </p>
      </footer>
    </div>
  );
}
