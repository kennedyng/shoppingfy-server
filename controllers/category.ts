import { NextFunction, Response } from "express";
import prisma from "../lib/utils/prisma";
import { CustomRequest } from "../types";

const createNewCategory = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const { userId } = req?.userData;

  try {
    const createdData = await prisma.category.create({
      data: {
        userId,
        name,
      },
    });

    return res.status(201).json(createdData);
  } catch (error) {
    next(error);
  }
};

const getUserCategories = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req?.userData;
    const createdData = await prisma.category.findMany({
      where: {
        userId,
      },
    });
    return res.status(201).json(createdData);
  } catch (error) {
    next(error);
  }
};

export { createNewCategory, getUserCategories };
