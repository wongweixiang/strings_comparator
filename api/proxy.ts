import type { VercelRequest, VercelResponse } from "@vercel/node";

const TARGET = "https://twu.tennis-warehouse.com/learning_center";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url?.replace("/api/proxy", "") ?? "";

  const response = await fetch(`${TARGET}${path}`, {
    method: req.method,
    body: req.method !== "GET" ? req.body : undefined,
    headers: {
      ...req.headers as Record<string, string>,  // forward all browser headers
      "host": "twu.tennis-warehouse.com",         // override host to match target
      "Referer": "https://twu.tennis-warehouse.com/",
      "Origin": "https://twu.tennis-warehouse.com",
    },
  });

  const data = await response.text();
  res.status(response.status).send(data);
}