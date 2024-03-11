import { NextFunction, Response } from "express";
import prisma from "../lib/utils/prisma";
import { CustomRequest } from "../types";

const completeShoppingCart = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, note, image_url, category_id } = req.body;
  try {
    const createdData = await prisma.item.create({
      data: {
        name,
        note,
        image_url,
        category: category_id,
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

export { completeShoppingCart };
