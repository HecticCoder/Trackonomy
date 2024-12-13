import express, { Application } from "express";
import morgan from "morgan";
import indexRouter from "./routes/index";
import cors from "cors";

const app: Application = express();

//Morgan for Logging requests
app.use(morgan("dev"));

//CORS
app.use(cors());

//Support application/json type post data
app.use(express.json());

//Support application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: false }));

//Index Route
app.use("/", indexRouter);

export default app;
