import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { streamText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const PROMPT = (docJson: string) => `
You are an expert tennis equipment analyst. Given the following tennis string data, 
write a concise 5-8 sentence analysis suitable for a recreational to intermediate player.

Focus on:
- What kind of player or playing style this string suits
- The practical implications of its spin potential, tension loss, and stiffness
- Whether it offers good comfort, control, or power trade-offs

Avoid technical jargon where possible. Do not repeat the raw numbers — interpret them.

String data:
${docJson}
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "prompt is required" });
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    prompt: PROMPT(prompt),
    maxTokens: 200,
  });

  return result.pipeTextStreamToResponse(res);
}
