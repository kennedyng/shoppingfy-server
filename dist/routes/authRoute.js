"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
// routes.ts
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.post("/login", auth_1.loginUser);
authRouter.post("/register", auth_1.registerUser);
