import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface BudgetInterface extends Document {
  user: mongoose.Types.ObjectId;
  budgetName: string;
  amount: number;
  duration: string;
  startDate: Date;
  endDate: Date;
  categories: {
    category: mongoose.Types.ObjectId;
    amount: number;
    savings: number;
  }[];
  totalSavings: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Budget Model
 */
const BudgetSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  budgetName: { type: String, required: false },
  amount: { type: Number, required: true },
  duration: { type: String, enum: ["week", "month", "year"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  categories: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      amount: { type: Number, required: true },
      savings: { type: Number, required: true },
    },
  ],
  totalSavings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Budget = mongoose.model<BudgetInterface>("Budget", BudgetSchema);
