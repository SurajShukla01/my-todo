import { Db, MongoClient, ServerApiVersion } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function connectToDb() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.scinalv.mongodb.net/?appName=Cluster0`;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  cachedClient = client;
  cachedDb = client.db("TODO");

  return { client, db: client.db("TODO") };
}
