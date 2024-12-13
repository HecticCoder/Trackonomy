import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Interface for the decoded token
interface DecodedToken extends JwtPayload {
  userId: string;
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access Denied: No Token Provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "", (err: any, decoded: any) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Invalid Token", error: err.message });
    }

    // Typecasting decoded to DecodedToken
    const decodedToken = decoded as DecodedToken;
    req.user = decodedToken;
    next();
  });
};

export default authenticateJWT;
