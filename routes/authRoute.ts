// routes.ts
import { Router, Request, Response } from "express";
import { loginUser, registerUser } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

export { authRouter };
