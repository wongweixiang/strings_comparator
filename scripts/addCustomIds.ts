import { MongoClient } from "mongodb";

import { options } from "@/constants/options.ts";

const customIds = Object.fromEntries(
  options.map(({ name, value }) => [name, value]),
);

const DB_NAME = "tennis";
const COLLECTION = "strings";

async function addCustomIds() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db(DB_NAME);
  const collection = db.collection(COLLECTION);

  //   const first = await collection.findOne({});
  //   console.log(JSON.stringify(first?.name)); // reveals hidden characters
  //   console.log(first?.name === "Alien Black Diamond 16"); // test exact match

  //   const results = await Promise.all(
  //     Object.entries(customIds).map(([name, customId]) =>
  //       collection.updateOne({ name }, { $set: { custom_id: customId } }),
  //     ),
  //   );

  //   const matched = results.filter((r) => r.matchedCount > 0).length;
  //   const unmatched = results.filter((r) => r.matchedCount === 0).length;

  //   console.log(`Updated: ${matched}, Not found: ${unmatched}`);

  const missingCustomId = await collection
    .find({
      custom_id: { $exists: false },
    })
    .toArray();

  console.log(`Missing Custom IDs: ${missingCustomId.length}`);
  missingCustomId.forEach((doc) => console.log(doc.name));

  await client.close();
}

addCustomIds();
