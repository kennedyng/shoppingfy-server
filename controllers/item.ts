import { NextFunction, Response } from "express";
import prisma from "../lib/utils/prisma";
import { CustomRequest } from "../types";

const createNewItem = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, note, image_url, category } = req.body;
    const { userId } = req?.userData;
    const createdData = await prisma.item.create({
      data: {
        name,
        note,
        image_url,
        categoryId: category,
        userId,
      },
    });

    return res.status(201).json(createdData);
  } catch (error) {
    next(error);
  }
};

const getItemById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.query;
  try {
    const data = await prisma.item.findUnique({
      where: {
        id: String(id),
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export { createNewItem };
