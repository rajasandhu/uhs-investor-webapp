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

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const question = req.body.question;

  console.log("🔍 Incoming Question:", question);
  console.log("🔑 API Key exists:", !!process.env.OPENAI_API_KEY);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });

    const answer = completion.choices[0]?.message?.content;
    console.log("✅ Answer:", answer);
    res.status(200).json({ answer });
  } catch (err) {
    console.error("❌ OpenAI error:", err);
    res.status(500).json({ answer: "Sorry, no response from the model." });
  }
}

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const question = req.body.question;
  console.log("🟡 Received question:", question);
  console.log("🟡 Using API Key:", !!process.env.OPENAI_API_KEY);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });

    const answer = response.choices[0]?.message?.content;
    console.log("✅ OpenAI Answer:", answer);
    res.status(200).json({ answer });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    res.status(200).json({ answer: "Sorry, no response from the model." });
  }
}

