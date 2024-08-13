import { Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});
export const User = mongoose.model("user", userSchema);
