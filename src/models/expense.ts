import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface ExpenseInterface extends Document {
  user: mongoose.Types.ObjectId;
  expenseName: string;
  amount: number;
  description: string;
  category: mongoose.Types.ObjectId;
  date: Date;
  createdAt: Date;
}

/**
 * Expense Model
 */
const ExpenseSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expenseName: { type: String, required: false },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Expense = mongoose.model<ExpenseInterface>(
  "Expense",
  ExpenseSchema
);
