import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface CategoryInterface extends Document {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<CategoryInterface>("Category", CategorySchema);
