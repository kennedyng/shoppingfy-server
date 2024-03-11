"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const prisma_1 = __importDefault(require("../lib/utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        // Verify password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            console.log("matching pawwa!", user.password);
            return res.status(401).json({ error: "Invalid email or password" });
        }
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRETE, {
            expiresIn: "1h", // Token expires in 1 hour
        });
        // Return token in response
        res.status(200).json({ token, id: user.id, email: user.email });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const accountExists = yield prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!accountExists) {
            // Hash password
            const hashedPassword = yield bcrypt_1.default.hash(password, 10); // 10 is the salt rounds
            const createdData = yield prisma_1.default.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
                select: {
                    email: true,
                    createdAt: true,
                    id: true,
                    updatedAt: true,
                },
            });
            return res.status(201).json(createdData);
        }
        return res
            .status(409)
            .json({ message: "Auth Failed Account Already Exists" });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
