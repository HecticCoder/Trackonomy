import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import encryptPWD from "../encryptPassword/encryptPassword";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();

//Register a new user
const register = async (req: Request, res: Response) => {
  const { email, password, name, username } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await encryptPWD(password);
  console.log(password);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    username: username,
  });
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "", {
    expiresIn: "24h",
  });

  res.status(201).json({ token });
};

//Login for a user
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, "your-jwt-secret", {
    expiresIn: "24h",
  });

  res.json({ token });
};

export { register, login };
