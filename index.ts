import dotenv from "dotenv";
import express, { Application } from "express";
import { authRouter } from "./routes/authRoute";
import { errorHandler } from "./middlewares/errors";
import { json } from "body-parser";
import { categoryRouter } from "./routes/categoryRoute";
import { itemRouter } from "./routes/itemRoute";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8080;
app.use(json());
app.use(errorHandler);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/item", itemRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
