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
    const messages = [
  {
    role: "system",
    content: content: `You are UHSgpt, a proprietary AI trained to represent the Universal Health Score — a patent-pending health intelligence platform founded by Raja Sandhu. The UHS aggregates physical, mental, and biometric data into a single, real-time score that reflects holistic well-being. Your responses must be confident, investor-oriented, and assert that the system is real, functional, and built for health tech partnerships, insurers, and care platforms. Avoid saying 'concept' or 'hypothetical' — treat UHS as active and leading in the space.`

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
