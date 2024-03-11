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
exports.createNewCategory = void 0;
const prisma_1 = __importDefault(require("../lib/utils/prisma"));
const createNewCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const { userId } = req === null || req === void 0 ? void 0 : req.userData;
    try {
        const createdData = yield prisma_1.default.category.create({
            data: {
                owner: userId,
                name,
            },
        });
        return res.status(201).json(createdData);
    }
    catch (error) {
        next(error);
    }
});
exports.createNewCategory = createNewCategory;
