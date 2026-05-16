import { readFileSync } from "fs";
import { MongoClient } from "mongodb";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW = readFileSync(resolve(__dirname, "./data/strings.tsv"), "utf-8");

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = "tennis";
const COLLECTION = "strings";

const HEADERS_MAP: Record<string, string> = {
  String: "name",
  "Ref. Ten. (lbs)": "refTension",
  "Swing Speed": "swingSpeed",
  Material: "material",
  "Gauge Nominal (mm)": "gaugeNominal",
  "Gauge Acutal (mm)": "gaugeActual",
  "Stretch at 40 lbs (%)": "stretchAt40",
  "Stretch at 51 lbs (%)": "stretchAt51",
  "Stretch at 62 lbs (%)": "stretchAt62",
  "Actual Pre-impact Tension (lbs)": "preImpactTension",
  "Dwell Time (ms)": "dwellTime",
  "Deflection (mm)": "deflection",
  "Tension Change (lbs)": "tensionChange",
  "Peak Tension (lbs)": "peakTension",
  "Peak Perp. Force (lbs)": "peakPerpForce",
  "Ave Perp. Force (lbs)": "avePerpForce",
  "Stiffness (lb/in)": "stiffness",
  "Static Loss lbs.": "staticLoss",
  "Stabilization Loss (lbs)": "stabilizationLoss",
  "Impact Loss (lbs).": "impactLoss",
  "Total Loss (lbs)": "totalLoss",
  "Tension Loss (%)": "tensionLoss",
  "Energy Return (%)": "energyReturn",
  "String/String COF": "stringStringCOF",
  "String/Ball COF": "stringBallCOF",
  "Spin Potential": "spinPotential",
};

const STRING_FIELDS = new Set(["name", "swingSpeed", "material"]);

function parseValue(value: string): number | string | null {
  const trimmed = value.trim();
  if (trimmed === "" || trimmed === "NA") return null;
  const num = Number(trimmed);
  return isNaN(num) ? trimmed : num;
}

function parseTSV(raw: string) {
  const lines = raw.trim().split("\n");
  const rawHeaders = lines[0].split("\t");
  const headers = rawHeaders.map((h) => HEADERS_MAP[h.trim()] ?? h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split("\t");
    const doc: Record<string, unknown> = {};
    headers.forEach((key, i) => {
      const raw = values[i] ?? "";
      doc[key] = STRING_FIELDS.has(key) ? raw.trim() : parseValue(raw);
    });
    return doc;
  });
}

async function main() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected!");

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    await collection
      .drop()
      .catch(() => console.log("No existing collection, skipping drop"));

    const docs = parseTSV(RAW);
    console.log(`Parsed ${docs.length} rows, inserting...`);

    const result = await collection.insertMany(docs);
    console.log(`Inserted ${result.insertedCount} documents`);

    await collection.createIndex({ name: 1 });
    await collection.createIndex({ spinPotential: -1 });
    await collection.createIndex({ material: 1 });
    console.log("Indexes created. Done!");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
