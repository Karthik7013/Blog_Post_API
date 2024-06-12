import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const MONGO_URI = process.env.MONGO_URI;
const db = async () => {
  const res = await mongoose.connect(MONGO_URI)
  return res;
};
export default db;
