"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("./routes/authRoute");
const errors_1 = require("./middlewares/errors");
const body_parser_1 = require("body-parser");
const categoryRoute_1 = require("./routes/categoryRoute");
const itemRoute_1 = require("./routes/itemRoute");
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, body_parser_1.json)());
app.use(errors_1.errorHandler);
app.use("/api/auth", authRoute_1.authRouter);
app.use("/api/category", categoryRoute_1.categoryRouter);
app.use("/api/item", itemRoute_1.itemRouter);
app.listen(process.env.PORT || port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
