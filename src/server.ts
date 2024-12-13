import app from "./app";
import authenticateJWT from "./controllers/authenticate";
import connectDB from "./dbConnection/db";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

// Configure dotenv to load the .env file
dotenv.config();

// Initialize Apollo Server
const server = new ApolloServer({
  context: (req: Request, res: Response, next: NextFunction) => {
    authenticateJWT(req, res, next);
  },
});

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    // Apply the Apollo Server middleware to your app
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen(PORT, () => {
      console.log(`Server is connected to port ${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });
