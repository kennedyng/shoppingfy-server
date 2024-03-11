import dotenv from "dotenv";
import express, { Application } from "express";
import { authRouter } from "./routes/authRoute";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
