// routes.ts
import { Router, Request, Response } from "express";
import { loginUser } from "../controllers/auth";

const authRouter = Router();

authRouter.get("/login", loginUser);

export { authRouter };
