"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate token
const checkAuth = (req, res, next) => {
    // Retrieve the authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Access token is missing" });
    }
    // Verify the token
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRETE, (err, userData) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.userData = userData; // Store user data in req.userData
        next();
    });
};
exports.checkAuth = checkAuth;
