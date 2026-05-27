import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SortDirection } from "mongodb";

import { getClient } from "./compare";

const DB_NAME = "tennis";
const COLLECTION = "strings";

const LIMIT = 30;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await getClient();
    const collection = client.db(DB_NAME).collection(COLLECTION);

    const { brands, sortBy } = req.query;

    const brandsArray = brands.split(",");

    const filter =
      brandsArray.length > 0
        ? {
            $or: brandsArray.map((brand: string) => ({
              name: { $regex: brand, $options: "i" },
            })),
          }
        : {};

    const docs = await collection
      .find(filter)
      .project({
        custom_id: 1,
        name: 1,
        material: 1,
        stiffness: 1,
        spinPotential: 1,
        energyReturn: 1,
        tensionLoss: 1,
        _id: 0, // exclude MongoDB's default _id field
      })
      .sort(getSortOrder(sortBy as string))
      .limit(LIMIT)
      .toArray();
    return res.status(200).json({ docs });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

const getSortOrder = (sortBy: string): Record<string, SortDirection> => {
  switch (sortBy) {
    case "energyReturn":
    case "spinPotential":
      return { [sortBy]: 1 };
    case "stiffness":
    case "tensionLoss":
      return { [sortBy]: -1 };
    default:
      return { name: 1 };
  }
};
