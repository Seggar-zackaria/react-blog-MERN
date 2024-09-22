import { MongoClient } from "mongodb";
let db;

async function connectDB(cb) {
  const client = new MongoClient(`mongodb://127.0.0.1:8000`);
  await client.connect();

  db = client.db("react-blog");
  cb();
}

export { db, connectDB };
