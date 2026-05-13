import type { VercelRequest, VercelResponse } from "@vercel/node";

const TARGET = "https://twu.tennis-warehouse.com/learning_center";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url?.replace("/api/proxy", "") ?? "";

  const response = await fetch(`${TARGET}${path}`, {
    method: req.method,
    body: req.method !== "GET" ? req.body : undefined,
    headers: {
      "Content-Type": req.headers["content-type"] || "application/x-www-form-urlencoded",
      "Referer": "https://twu.tennis-warehouse.com/",
      "Origin": "https://twu.tennis-warehouse.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  });

  const data = await response.text();
  res.status(response.status).send(data);
}