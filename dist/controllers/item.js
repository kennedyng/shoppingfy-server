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
exports.createNewItem = void 0;
const prisma_1 = __importDefault(require("../lib/utils/prisma"));
const createNewItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, note, image_url, category_id } = req.body;
    try {
        const createdData = yield prisma_1.default.item.create({
            data: {
                name,
                note,
                image_url,
                category: category_id,
            },
        });
        return res.status(201).json(createdData);
    }
    catch (error) {
        next(error);
    }
});
exports.createNewItem = createNewItem;
const getItemById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const data = yield prisma_1.default.item.findUnique({
            where: {
                id: String(id),
            },
        });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
