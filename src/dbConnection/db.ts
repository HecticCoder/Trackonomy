import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "";
    await mongoose.connect(uri);
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
