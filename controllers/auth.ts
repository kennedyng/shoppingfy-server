import { NextFunction, Request, Response } from "express";
import prisma from "../lib/utils/prisma";

const loginUser = async (req: Request, res: Response) => {
  const data = { msg: "hello!" };
  console.log(data);
  res.json(data);
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const accountExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!accountExists) {
      const createdData = await prisma.user.create({
        data: {
          email,
          password,
        },
      });

      return res.status(201).json(createdData);
    }
    return res
      .status(409)
      .json({ message: "Auth Failed Account Already Exists" });
  } catch (error) {
    next(error);
  }
};

export { loginUser, registerUser };
