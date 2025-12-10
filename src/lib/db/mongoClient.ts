import { MongoClient, Db } from "mongodb";
import { MONGODB_URI, MONGODB_DB_NAME, PERSISTENCE_DRIVER } from "../env";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (PERSISTENCE_DRIVER !== "mongo") {
    throw new Error("getDb() called but PERSISTENCE_DRIVER is not 'mongo'");
  }

  // Copy to local variables so TS can narrow their types
  const uri = MONGODB_URI;
  const dbName = MONGODB_DB_NAME;

  if (!uri || !dbName) {
    throw new Error("MONGODB_URI and MONGODB_DB_NAME must be set when PERSISTENCE_DRIVER='mongo'");
  }

  if (cachedDb && cachedClient) return cachedDb;

  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return db;
}
