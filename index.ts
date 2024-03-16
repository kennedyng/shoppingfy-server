import dotenv from "dotenv";
import express, { Application } from "express";
import { authRouter } from "./routes/authRoute";
import { errorHandler } from "./middlewares/errors";
import { json } from "body-parser";
import { categoryRouter } from "./routes/categoryRoute";
import { itemRouter } from "./routes/itemRoute";
import cors from "cors";
import morgan from "morgan";
//For env File
dotenv.config();

const allowedOrigins = [
  "http://localhost:3000",
  "http://example.com",
  "http://otherdomain.com",
];

const app: Application = express();
const port = process.env.PORT || 8080;
// Middleware to set headers
app.use((req, res, next) => {
  // Set common headers
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // You can set a specific origin here instead of *
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: allowedOrigins }));

// Middleware to log requests
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/item", itemRouter);

app.get("*", (req, res) => {
  res.json({ message: "check the endpoint it does not exist!" });
});

app.use(errorHandler);

app.listen(process.env.PORT || port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
