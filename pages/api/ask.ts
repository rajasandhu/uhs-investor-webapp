import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const question = req.body?.question;

  console.log("Received question:", question);
  console.log("Using API Key:", !!process.env.OPENAI_API_KEY);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    });

    const answer = completion.choices[0]?.message?.content;
    console.log("OpenAI Answer:", answer);
    res.status(200).json({ answer });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(200).json({ answer: "Sorry, no response from the model." });
  }
}
