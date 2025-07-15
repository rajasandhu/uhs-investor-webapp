export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  const { question } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert assistant for investors learning about the Universal Health Score invented by Raja Sandhu."
        },
        { role: "user", content: question }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ answer: data.choices?.[0]?.message?.content?.trim() || "Sorry, no response from the model." });
}

