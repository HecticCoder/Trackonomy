import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface userInterface extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>; //method to compare password
}

const userSchema = new Schema<userInterface>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

//Defining a method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<userInterface>("User", userSchema);

export default User;
