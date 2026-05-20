// api/compare.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

const DB_NAME = "tennis";
const COLLECTION = "strings";

// Reuse the client across warm invocations
let client: MongoClient;

async function getClient() {
  if (!client) {
    client = new MongoClient(MONGODB_URI, {
      tls: true,
      tlsInsecure: true,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
  }
  return client;
}

function formatStats(doc: Record<string, unknown>) {
  return {
    stiffness: doc.stiffness ?? null,
    tensionLoss: doc.tensionLoss ?? null,
    energyReturn: doc.energyReturn ?? null,
    spinPotential: doc.spinPotential ?? null,
    stringFriction: doc.stringStringCOF ?? null,
    ballFriction: doc.stringBallCOF ?? null,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { nameA, nameB } = req.query;

  if (!nameA || !nameB) {
    return res
      .status(400)
      .json({ error: "nameA and nameB query params are required" });
  }

  try {
    const client = await getClient();
    console.log({client})
    const collection = client.db(DB_NAME).collection(COLLECTION);

    const [docA, docB] = await Promise.all([
      collection.findOne({ name: nameA as string }),
      collection.findOne({ name: nameB as string }),
    ]);

    if (!docA)
      return res.status(404).json({ error: `String not found: ${nameA}` });
    if (!docB)
      return res.status(404).json({ error: `String not found: ${nameB}` });

    return res.status(200).json({
      stringA: {
        name: docA.name,
        material: docA.material,
        stats: formatStats(docA),
      },
      stringB: {
        name: docB.name,
        material: docB.material,
        stats: formatStats(docB),
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
