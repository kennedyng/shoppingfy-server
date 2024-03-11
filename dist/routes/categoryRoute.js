"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
// routes.ts
const express_1 = require("express");
const category_1 = require("../controllers/category");
const auth_1 = require("../middlewares/auth");
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter.post("/create", auth_1.checkAuth, category_1.createNewCategory);
