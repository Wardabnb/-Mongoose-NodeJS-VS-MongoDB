import mongoose from "mongoose";
import "dotenv/config";
export async function DBConnect() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected!");
}
