import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question, systemPrompt } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt || "You are a helpful assistant." },
        { role: "user", content: question }
      ]
    });

    const answer = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
    res.status(200).json({ answer });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ answer: "Sorry, no response from the model." });
  }
}
