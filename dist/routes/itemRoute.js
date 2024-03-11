"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
// routes.ts
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const item_1 = require("../controllers/item");
const itemRouter = (0, express_1.Router)();
exports.itemRouter = itemRouter;
itemRouter.post("/create", auth_1.checkAuth, item_1.createNewItem);
itemRouter.get("/:id", auth_1.checkAuth, item_1.createNewItem);
