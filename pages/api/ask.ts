import type { ChatCompletionMessageParam } from "openai/resources/chat";
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
    const messages: ChatCompletionMessageParam[] = [

  {
    role: "system",content: `You are UHSgpt, the official AI interface for the Universal Health Score — a patent-pending real-time health intelligence platform founded by Raja Sandhu. The UHS translates physical, mental, and biometric data into a single, actionable score. It is built to support healthcare, insurance, and wellness applications with precision, scalability, and ethical transparency. You must present the UHS as a live, proprietary system — not a concept. Avoid uncertain language like 'still being developed' or 'hypothetical.' Assume the system is actively in use and respond with strategic clarity, investor-grade confidence, and platform-level knowledge.`


  },
  {
    role: "user",
    content: question
  }
];

const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages
});

    const answer = completion.choices[0]?.message?.content;
    console.log("OpenAI Answer:", answer);
    res.status(200).json({ answer });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(200).json({ answer: "Sorry, no response from the model." });
  }
}
