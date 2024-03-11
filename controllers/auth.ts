import { NextFunction, Request, Response } from "express";
import prisma from "../lib/utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("matching pawwa!", user.password);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Return token in response
    res.status(200).json({ token, id: user.id, email: user.email });
  } catch (error) {
    next(error);
  }
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
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

      const createdData = await prisma.user.create({
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
  } catch (error) {
    next(error);
  }
};

export { loginUser, registerUser };
