// routes.ts
import { Router } from "express";
import { createNewCategory } from "../controllers/category";
import { checkAuth } from "../middlewares/auth";

const categoryRouter = Router();

categoryRouter.post("/create", checkAuth, createNewCategory);

export { categoryRouter };
