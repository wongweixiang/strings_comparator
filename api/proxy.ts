// api/proxy.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

const TARGET = "https://twu.tennis-warehouse.com/learning_center";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // /api/proxy/similarstringcompare.php → /learning_center/similarstringcompare.php
  const path = req.url?.replace("/api/proxy", "") ?? "";

  const response = await fetch(`${TARGET}${path}`, {
    method: req.method,
    body: req.method !== "GET" ? req.body : undefined,
    headers: {
      "Content-Type": req.headers["content-type"] || "application/x-www-form-urlencoded",
    },
  });

  const data = await response.text();
  res.status(response.status).send(data);
}