// routes.ts
import { Router } from "express";
import { createNewCategory, getUserCategories } from "../controllers/category";
import { checkAuth } from "../middlewares/auth";

const router = Router();

router.post("/create", checkAuth, createNewCategory);
router.get("/", checkAuth, getUserCategories);

export { router as categoryRouter };
