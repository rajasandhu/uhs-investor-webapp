import { useState } from 'react';

export default function UHSInvestorQnA() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponse("");
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: query })
    });
    const data = await res.json();
    setResponse(data.answer);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>UHS Investor Q&A</h1>
      <p>Ask anything about the Universal Health Score vision, monetization, roadmap, or risks.</p>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          style={{ flex: 1, padding: "0.5rem" }}
          placeholder="Ask your question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
      {response && (
        <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "6px", whiteSpace: "pre-wrap" }}>
          {response}
        </div>
      )}
    </div>
  );
}

