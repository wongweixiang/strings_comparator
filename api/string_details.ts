// api/stringDetails.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

import { getClient } from "./compare";

const DB_NAME = "tennis";
const COLLECTION = "strings";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { name } = req.query;

  try {
    const client = await getClient();
    const collection = client.db(DB_NAME).collection(COLLECTION);

    const doc = await collection.findOne({ name: name as string });

    return res.status(200).json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
