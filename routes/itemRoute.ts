// routes.ts
import { Router } from "express";
import { createNewCategory } from "../controllers/category";
import { checkAuth } from "../middlewares/auth";
import { createNewItem } from "../controllers/item";

const itemRouter = Router();

itemRouter.post("/create", checkAuth, createNewItem);
itemRouter.get("/:id", checkAuth, createNewItem);

export { itemRouter };
