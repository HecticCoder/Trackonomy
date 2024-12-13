import express from "express";
import { Request, Response } from "express";
import { register, login } from "../controllers/authFlow";
import authenticateJWT from "../controllers/authenticate";

const router = express.Router();

//Landing page Route
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is an Expense Tracker Application, my friend.",
  });
});

//Authentication Routes
router.post("/register", register);
router.post("/login", login);

export default router;
